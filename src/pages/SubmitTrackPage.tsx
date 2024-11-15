import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, Music2, ArrowLeft, Info } from 'lucide-react';
import AudioUploader from '../components/Submission/AudioUploader';
import SubmissionForm from '../components/Submission/SubmissionForm';

export default function SubmitTrackPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => navigate(`/battle/${id}`)}
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Battle
        </button>

        <div className="bg-gray-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Submit Your Beat</h1>
            <p className="text-gray-400 mt-2">Upload your track and provide details</p>
          </div>

          <div className="space-y-8">
            <AudioUploader />
            <SubmissionForm />
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-medium mb-1">Submission Guidelines:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>WAV or MP3 format (320kbps minimum)</li>
                <li>Maximum length: 2 minutes</li>
                <li>Must be an original composition</li>
                <li>No sample packs or pre-made loops</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}