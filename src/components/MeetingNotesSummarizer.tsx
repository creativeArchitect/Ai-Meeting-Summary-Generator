import React, { useState } from 'react';
import Header from './Header';
import TranscriptInputCard from './TranscriptInputCard';
import PromptInputCard from './PromptInputCard';
import SummaryOutputCard from './SummaryOutputCard';
import EmailShareCard from './EmailShareCard';
import { Axis3D, X } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';

const MeetingNotesSummarizer = () => {
  const [transcript, setTranscript] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('Meeting Summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState(null);

  const [toastMessage, setToastMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (toastMessage.text) {
      const timeout = setTimeout(() => {
        setToastMessage({ type: '', text: '' });
      }, 4000); // auto-hide after 4 seconds
  
      return () => clearTimeout(timeout); // cleanup
    }
  }, [toastMessage]);

  const uploadHandler = async (formData, selectedFile)=> {
    try{
      const res = await axios.post(import.meta.env.VITE_UPLOAD_API_URL as string, formData, {
        headers: {
           "Content-Type": "multipart/form-data"
        },
      })
    
      if (res.status === 200) {
        setTranscript(res.data.transcript);
        setToastMessage({
          type: "success",
          text: `File uploaded successfully: ${selectedFile.name}`,
        });
      } else {
        setToastMessage({
          type: "error",
          text: `Unexpected response while uploading ${selectedFile.name}`,
        });
      }
    }catch(err: any){
      setToastMessage({
        type: "error",
        text: `File upload error: ${err.message}`,
      });
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "text/plain" || selectedFile.name.endsWith(".txt") || selectedFile.name.endsWith(".docx")) {
        setFile(selectedFile);
  
        // Build FormData for backend
        const formData = new FormData();
        formData.append("file", selectedFile);

        uploadHandler(formData, selectedFile);
  
        // For previewing file contents locally (TXT only)
        if (selectedFile.type === "text/plain" || selectedFile.name.endsWith(".txt")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result as string;
            setTranscript(text);
          };
          reader.readAsText(selectedFile);
        }
      } else {
        setToastMessage({
          type: "error",
          text: "Invalid file type. Please upload a .txt or .docx file.",
        });
      }
    }
  };
  

  const generateSummary = async () => {
    if (!transcript.trim()) {
      setToastMessage({ type: 'error', text: "Please provide a meeting transcript to summarize." });
      return; // stop execution
    }
  
    if (!customPrompt.trim()) {
      setToastMessage({ type: 'error', text: "Please provide summarization instructions." });
      return; // stop execution
    }
  
    setIsGenerating(true);
  
    try {
      const res = await axios.post(import.meta.env.VITE_SUMMARY_API_URL as string, {
        transcript,
        customPrompt,
      });
  
      if (res.status === 200 && res.data.summary) {
        setSummary(res.data.summary);
        setToastMessage({ type: 'success', text: "Summary generated successfully!" });
      } else {
        setToastMessage({ type: 'error', text: "Unexpected response from summary API" });
      }
    } catch (err: any) {
      setToastMessage({ type: 'error', text: `Summary generation failed: ${err.message}` });
    } finally {
      setIsGenerating(false);
    }
  };
  

  const sendEmail = async () => {

    if (!summary.trim()) {
      setToastMessage({ type: 'error', text: "No summary to send. Please generate one first." });
      return;
    }

    const email = recipient.trim();

    if (!email) {
      setToastMessage({ type: 'error', text: "Please provide at least one email address." });
      return;
    }

    setIsSending(true);

    try {
      const res = await axios.post(import.meta.env.VITE_EMAIL_API_URL as string, {
        recipient,
        subject,
        summary,
      });

      if (res.status === 200) {
        setToastMessage({
          type: "success",
          text: `Email sent successfully to ${recipient}.`,
        });
        setRecipient("");
      } else {
        setToastMessage({
          type: "error",
          text: "Email sending error, please try again later",
        });
      }
    } catch (err: any) {
      setToastMessage({
        type: "error",
        text: `Email sending failed: ${err.message}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 py-6 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Input */}
          <div className="space-y-6">
            <TranscriptInputCard
              transcript={transcript}
              setTranscript={setTranscript}
              handleFileUpload={handleFileUpload}
              file={file}
            />
            <PromptInputCard
              customPrompt={customPrompt}
              setCustomPrompt={setCustomPrompt}
              generateSummary={generateSummary}
              isGenerating={isGenerating}
              transcript={transcript}
            />
          </div>

          {/* Right Side - Output */}
          <div className="space-y-6">
            <SummaryOutputCard summary={summary} setSummary={setSummary} />
            <EmailShareCard
              summary={summary}
              recipient={recipient}
              setRecipient={setRecipient}
              subject={subject}
              setSubject={setSubject}
              sendEmail={sendEmail}
              isSending={isSending}
            />
          </div>
        </div>
      </div>

      {/* Toast Messages */}
      {toastMessage.text && (
        <div className="fixed bottom-4 right-4 sm:right-6 z-50">
          <div
            className={`alert ${
              toastMessage.type === 'success' ? 'alert-success' : 'alert-error'
            } shadow-lg relative pr-10`}
          >
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage({ type: '', text: '' })}
              className="absolute right-2 top-2 hover:text-base-content text-black"
              aria-label="Close toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}


🔍 Key Detail
    </main>
  );
};

export default MeetingNotesSummarizer;
