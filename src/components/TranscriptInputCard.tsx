'use client';
import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

const TranscriptInputCard = ({ transcript, setTranscript, handleFileUpload, file }) => {
  return (
    <div className="card w-full bg-base-200 shadow-lg sm:shadow-xl">
      <div className="card-body space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Upload Transcript</h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-base-content/70">
          Upload a <strong>.txt file</strong> or paste your meeting transcript manually below.
        </p>

        {/* File Upload */}
        <div>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="file-input file-input-bordered w-full"
          />
          {file && (
            <div className="mt-2 inline-flex items-center gap-2 badge badge-success animate-pulse-soft">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{file.name}</span>
            </div>
          )}
        </div>

        {/* Textarea Input */}
        <div className="form-control flex flex-col gap-1">
          <label className="label">
            <span className="label-text text-sm sm:text-base font-medium">Meeting Transcript</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-72 w-full resize-none text-sm sm:text-base"
            placeholder="Paste your meeting transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TranscriptInputCard;
