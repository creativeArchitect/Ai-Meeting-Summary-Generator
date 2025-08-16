
import { Wand2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-base-200 shadow-md sm:shadow-xl">
          <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
          <span className="text-base sm:text-xl md:text-2xl font-semibold sm:font-bold text-base-content whitespace-nowrap">
            AI Meeting Notes Summarizer
          </span>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-base-content/70 max-w-[90%] sm:max-w-xl">
          Transform your meeting transcripts into actionable summaries with custom AI instructions, then share them instantly via email.
        </p>
      </div>
    </header>
  );
};

export default Header;
