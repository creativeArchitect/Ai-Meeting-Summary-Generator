import { Mail, Loader2 } from 'lucide-react';

type EmailShareCardProps = {
  summary: string;
  recipient: string;
  setRecipient: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  sendEmail: () => void;
  isSending: boolean;
};


const EmailShareCard = ({
  summary,
  recipient,
  setRecipient,
  subject,
  setSubject,
  sendEmail,
  isSending
}: EmailShareCardProps) => {
  return (
    <div className="card w-full bg-base-200 shadow-lg sm:shadow-xl">
      <div className="card-body space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Share via Email</h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-base-content/70">
          Send your meeting summary to team members.
        </p>

        {/* Subject Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Email Subject</span>
          </label>
          <input
            type="text"
            placeholder="Meeting Summary - [Date]"
            className="input input-bordered w-full text-sm sm:text-base"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Recipients Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Recipient</span>
          </label>
          <input
            type="text"
            placeholder="email1@example.com, email2@example.com"
            className="input input-bordered w-full text-sm sm:text-base"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-xs opacity-70">
              Separate multiple emails with commas
            </span>
          </label>
        </div>

        {/* Send Button */}
        <button
          className="btn btn-accent w-full"
          onClick={sendEmail}
          disabled={isSending || !summary.trim() || !recipient.trim()}
        >
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Email...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Summary
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailShareCard;
