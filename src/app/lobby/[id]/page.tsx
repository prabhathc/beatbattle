"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Users,
  Clock,
  Trophy,
  AudioLines,
  Copy,
  Zap,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function LobbyPage() {
  const params = useParams();
  const lobbyId = params?.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [, setArtwork] = useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const copyLobbyCode = () => {
    navigator.clipboard.writeText(lobbyId);
  };

  const handleSkipQueue = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;
    // TODO: Implement Stripe Checkout
  };

  const handleArtworkChange = (file: File | null) => {
    if (file) {
      setArtwork(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtworkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setArtwork(null);
      setArtworkPreview(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Handle submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Lobby Header */}
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-gray-400">Lobby Code:</span>
              <button
                onClick={copyLobbyCode}
                className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              >
                <span className="text-white font-mono">{lobbyId}</span>
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Summer Beat Championship
            </h1>
            <p className="text-gray-400 mb-8">
              Create your best summer-themed beat and compete for the grand
              prize!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Participants</p>
                <p className="text-xl font-bold text-white">24</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Time Remaining</p>
                <p className="text-xl font-bold text-white">2h 15m</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Prize Pool</p>
                <p className="text-xl font-bold text-white">$500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Submit Your Track
            </h2>

            <div className="mb-8">
              <button
                onClick={handleSkipQueue}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Skip the Queue for $5</span>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  Get your track reviewed first!
                </p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Audio Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Audio File (WAV or MP3)
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".wav,.mp3"
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {audioFile ? (
                      <div className="flex items-center gap-2">
                        <AudioLines className="w-6 h-6 text-purple-400" />
                        <span className="text-purple-400 font-medium">
                          {audioFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAudioFile(null)}
                          className="p-1 hover:bg-gray-700 rounded-full"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <AudioLines className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-gray-300">
                          Drag and drop your audio file here, or click to browse
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          WAV or MP3, max 50MB
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Artwork Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Artwork
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      artworkPreview ? "border-purple-500" : "border-gray-600"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleArtworkChange(e.target.files?.[0] || null)
                      }
                      className="hidden"
                      id="artwork-upload"
                    />
                    <label
                      htmlFor="artwork-upload"
                      className="cursor-pointer block"
                    >
                      {artworkPreview ? (
                        <div className="relative aspect-square">
                          <Image
                            src={artworkPreview}
                            alt="Artwork preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleArtworkChange(null)}
                            className="absolute top-2 right-2 p-1 bg-gray-900/80 hover:bg-gray-900 rounded-full"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-8">
                          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-gray-300">Add Artwork</span>
                          <span className="text-sm text-gray-500">
                            Optional
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>Artwork Guidelines:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Square image (1:1 ratio)</li>
                      <li>Minimum 500x500 pixels</li>
                      <li>JPG or PNG format</li>
                      <li>Max 5MB file size</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Track Details */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300"
                >
                  Track Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Give your track a name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Tell us about your track..."
                />
              </div>

              <button
                type="submit"
                disabled={!audioFile || isSubmitting}
                className={`w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                  !audioFile || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Upload className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit Track"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
