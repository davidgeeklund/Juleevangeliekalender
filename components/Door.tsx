import React from 'react';

interface DoorProps {
  day: number;
  isOpen: boolean;
  onClick: () => void;
}

const Door: React.FC<DoorProps> = ({ day, isOpen, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative w-full aspect-square cursor-pointer perspective-1000 group ${isOpen ? 'cursor-default' : ''}`}
    >
      <div 
        className={`w-full h-full duration-700 preserve-3d transition-transform ${isOpen ? 'rotate-y-180' : 'group-hover:scale-105'}`}
      >
        {/* Front of the door (Closed) */}
        <div className="absolute w-full h-full backface-hidden bg-advent-red border-4 border-advent-gold rounded-lg flex flex-col items-center justify-center shadow-lg bg-opacity-90">
            <div className="absolute inset-0 border border-white/20 rounded-lg m-1"></div>
            <span className="text-4xl md:text-5xl font-christmas text-advent-gold drop-shadow-md">{day}</span>
            <div className="mt-2 text-advent-gold opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
        </div>

        {/* Back of the door (Open) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-star-light border-4 border-advent-green rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
           <div className="text-advent-green flex flex-col items-center">
             <span className="font-christmas text-xl font-bold">Luke {day}</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-2" fill="currentColor" viewBox="0 0 20 20">
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Door;