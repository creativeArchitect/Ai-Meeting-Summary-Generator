import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const SummaryOutputCard = ({ summary, setSummary }) => {
  return (
    <div className="card w-full bg-base-200 shadow-lg sm:shadow-xl">
      <div className="card-body space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold flex items-center">
            Generated Summary
            {summary && <CheckCircle className="h-5 w-5 text-success ml-2" />}
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-base-content/70">
          Review and edit your AI-generated summary below.
        </p>

        {/* Summary Textarea */}
        <div className="form-control flex flex-col gap-1">
          <label className="label">
            <span className="label-text text-sm sm:text-base">AI Summary Output</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-72 w-full resize-none text-sm sm:text-base"
            placeholder="Your summary will appear here after generation..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {/* Empty state message */}
        {!summary && (
          <div className="text-center py-12 text-base-content/40">
            <AlertCircle className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-4" />
            <p className="text-base sm:text-lg">Generate a summary to get started</p>
            <p className="text-xs sm:text-sm mt-2 opacity-70">Your AI-powered summary will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryOutputCard;
