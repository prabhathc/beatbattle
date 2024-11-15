"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import { Track } from "@/types/track";

// Using more reliable demo audio files
const DEMO_TRACKS = [
  {
    id: "1",
    title: "slumppped",
    artist: "geeky",
    artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
    isPrioritized: true,
    submittedAt: "5m ago",
    audioUrl: "/audio/lol.wav",
  },
  {
    id: "2",
    title: "touchdown",
    artist: "vvs",
    isPrioritized: false,
    submittedAt: "10m ago",
    audioUrl: "/audio/touch.wav",
  },
];

export default function StreamView() {
  const [queue] = useState<Track[]>(DEMO_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    const initWavesurfer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const wavesurfer = WaveSurfer.create({
          container: waveformRef.current!,
          waveColor: "rgba(139, 92, 246, 0.4)",
          progressColor: "rgba(139, 92, 246, 0.8)",
          cursorColor: "#4c1d95",
          barWidth: 2,
          barGap: 1,
          height: 60,
          barRadius: 3,
          normalize: true,
          backend: "WebAudio",
          autoplay: false,
        });

        wavesurfer.on("error", (err) => {
          console.error("WaveSurfer error:", err);
          setError("Failed to load audio file. Please try again.");
          setIsLoading(false);
        });

        wavesurfer.on("ready", () => {
          setIsLoading(false);
          setError(null);
        });

        wavesurfer.on("finish", () => {
          setIsPlaying(false);
          handleNext();
        });

        wavesurferRef.current = wavesurfer;

        // Load initial track
        if (queue.length > 0) {
          setCurrentTrack(queue[0]);
        }
      } catch (err) {
        console.error("WaveSurfer initialization error:", err);
        setError("Failed to initialize audio player");
        setIsLoading(false);
      }
    };

    initWavesurfer();

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const loadAudio = async () => {
      if (!currentTrack || !wavesurferRef.current) return;

      try {
        setIsLoading(true);
        setError(null);
        setIsPlaying(false);

        // Skip pre-fetch check for local files
        if (!currentTrack.audioUrl.startsWith("/")) {
          // Pre-fetch remote audio files to verify accessibility
          const response = await fetch(currentTrack.audioUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        // Load the audio file into WaveSurfer
        await wavesurferRef.current.load(currentTrack.audioUrl);
      } catch (err) {
        console.error("Audio loading error:", err);
        setError(
          "Failed to load audio file. Please check the URL and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAudio();
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!wavesurferRef.current || isLoading || error) return;

    try {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Playback error:", err);
      setError("Failed to play audio. Please try again.");
    }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextTrack = queue[currentIndex + 1] || queue[0];
    setCurrentTrack(nextTrack);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrack.id
    );
    const prevTrack = queue[currentIndex - 1] || queue[queue.length - 1];
    setCurrentTrack(prevTrack);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="h-screen flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto w-full space-y-8">
            {/* Current Track Info */}
            <div className="text-center">
              <div className="relative w-64 h-64 mx-auto mb-6">
                {currentTrack?.artwork ? (
                  <Image
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <Music2 className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentTrack?.title || "No track selected"}
              </h2>
              <p className="text-gray-400">{currentTrack?.artist}</p>
            </div>

            {/* Waveform */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              {error ? (
                <div className="text-red-400 text-center py-4">{error}</div>
              ) : (
                <div ref={waveformRef} className="w-full" />
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={handlePrevious}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                <SkipBack className="w-8 h-8" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-4 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
                disabled={isLoading || !!error}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white" />
                )}
              </button>
              <button
                onClick={handleNext}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                <SkipForward className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Queue */}
        <div className="w-full md:w-96 bg-gray-800/30 backdrop-blur-lg p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Queue</h3>
          <div className="space-y-4">
            {queue.map((track) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrack(track)}
                className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors ${
                  currentTrack?.id === track.id
                    ? "bg-purple-500/20 border border-purple-500/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  {track.artwork ? (
                    <Image
                      src={track.artwork}
                      alt={track.title}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                      <Music2 className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">
                    {track.title}
                  </h4>
                  <p className="text-gray-400 text-sm truncate">
                    {track.artist}
                  </p>
                </div>
                {track.isPrioritized && (
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/50">
                    Priority
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
