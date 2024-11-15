import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function AudioUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav'];
    if (!validTypes.includes(file.type)) {
      return 'Please upload an MP3 or WAV file';
    }
    if (file.size > 50 * 1024 * 1024) {
      return 'File size must be less than 50MB';
    }
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    const errorMsg = validateFile(droppedFile);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setFile(droppedFile);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const errorMsg = validateFile(selectedFile);
      if (errorMsg) {
        setError(errorMsg);
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <input
              type="file"
              accept=".mp3,.wav"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300">
              Drag and drop your audio file here, or{' '}
              <span className="text-purple-400">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">MP3 or WAV, max 50MB</p>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-sm text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}