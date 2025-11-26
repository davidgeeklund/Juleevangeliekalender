import React from 'react';
import { DayContent } from '../types';

interface ContentModalProps {
  content: DayContent | null;
  isLoading: boolean;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ content, isLoading, onClose }) => {
  if (!content && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white text-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative border-4 border-advent-gold">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-advent-red transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with decorative bg */}
        <div className="bg-advent-red p-6 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
           <h2 className="text-3xl font-christmas text-advent-gold relative z-10">
             {isLoading ? "Åpner luken..." : `Luke ${content?.day}`}
           </h2>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center">
          {isLoading ? (
            <div className="flex flex-col items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-advent-red mb-4"></div>
              <p className="text-gray-500 font-christmas text-xl">Henter dagens overraskelse...</p>
            </div>
          ) : (
            <>
               {/* Icon */}
              <div className="mb-6 text-advent-gold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.25 10a.75.75 0 01.75.75h1.5a.75.75 0 010-1.5h-1.5a.75.75 0 01-.75.75zM2.5 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012.5 10zM4.93 5.99a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.99 5.99a.75.75 0 01-1.06 0zM12.98 12.98a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM5.99 14.01a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 010 1.06zM14.04 4.93a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" />
                </svg>
              </div>

              <blockquote className="font-serif italic text-xl text-advent-green mb-4">
                "{content?.verseText}"
              </blockquote>
              <p className="text-sm font-bold text-advent-red mb-6 uppercase tracking-widest">
                — {content?.verseReference}
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <h3 className="font-christmas text-xl mb-2 text-advent-gold text-shadow-sm font-bold">Dagens Oppmuntring</h3>
                <p className="text-gray-700 leading-relaxed">
                  {content?.encouragement}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;