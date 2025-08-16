import { Wand2, Loader2 } from 'lucide-react';

const promptTemplates = [
  "Summarize in bullet points for executives",
  "List only the action items and deadlines",
  "Create a detailed technical summary",
  "Extract key decisions and next steps",
  "Highlight risks and concerns mentioned"
];

const PromptInputCard = ({ customPrompt, setCustomPrompt, generateSummary, isGenerating, transcript }) => {
  return (
    <div className="card w-full bg-base-200 shadow-lg sm:shadow-xl">
      <div className="card-body space-y-4 sm:space-y-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Summarization Instructions</h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-base-content/70">
          Tell the AI how you want your meeting summarized.
        </p>

        {/* Templates */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Quick Templates</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {promptTemplates.map((template, index) => (
              <div
                key={index}
                className="badge badge-outline cursor-pointer transition-all hover:bg-primary/20 hover:text-primary text-xs sm:text-sm px-3 py-2"
                onClick={() => setCustomPrompt(template)}
              >
                {template}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="form-control flex flex-col gap-1">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Custom Instructions</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full resize-none text-sm sm:text-base"
            placeholder="Example: Summarize in bullet points focusing on action items, deadlines, and key decisions..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          className="btn btn-primary w-full"
          onClick={generateSummary}
          disabled={isGenerating || !transcript.trim() || !customPrompt.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Summary...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Summary
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInputCard;
