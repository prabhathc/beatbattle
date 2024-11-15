import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Users,
  Clock,
  Trophy,
  AudioLines,
  Copy,
  Zap,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key");

export default function BattleDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artwork, setArtwork] = useState<File | null>(null);

  const copyLobbyCode = () => {
    navigator.clipboard.writeText(typeof id === "string" ? id : "");
  };

  const handleSkipQueue = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // Call your backend to create a Stripe Checkout session
    // const response = await fetch('/api/create-checkout-session', ...);
    // const session = await response.json();
    // await stripe.redirectToCheckout({ sessionId: session.id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Handle submission logic here
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    router.push(`/battle/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Lobby Header */}
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-gray-400">Lobby Code:</span>
              <button
                onClick={copyLobbyCode}
                className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              >
                <span className="text-white font-mono">{id}</span>
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Summer Beat Championship
            </h1>
            <p className="text-gray-400 mb-8">
              Create your best summer-themed beat and compete for the grand
              prize!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
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
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
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
                    <AudioLines className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-300">
                      {audioFile ? audioFile.name : "Click to upload audio"}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      WAV or MP3, max 50MB
                    </span>
                  </label>
                </div>
              </div>

              {/* Artwork Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Artwork (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setArtwork(e.target.files?.[0] || null)}
                    className="hidden"
                    id="artwork-upload"
                  />
                  <label
                    htmlFor="artwork-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-300">
                      {artwork ? artwork.name : "Click to upload artwork"}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      JPG or PNG, max 5MB
                    </span>
                  </label>
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
