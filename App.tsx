import React, { useState, useEffect } from 'react';
import Door from './components/Door';
import ContentModal from './components/ContentModal';
import SnowEffect from './components/SnowEffect';
import { fetchDayContent } from './services/geminiService';
import { DayContent } from './types';

const App: React.FC = () => {
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);
  const [cachedContent, setCachedContent] = useState<Record<number, DayContent>>({});
  const [activeContent, setActiveContent] = useState<DayContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedOpened = localStorage.getItem('adventOpenedDoors');
    const savedContent = localStorage.getItem('adventContent');
    
    if (savedOpened) {
      setOpenedDoors(JSON.parse(savedOpened));
    }
    if (savedContent) {
      setCachedContent(JSON.parse(savedContent));
    }
  }, []);

  // Save state to local storage when changed
  useEffect(() => {
    localStorage.setItem('adventOpenedDoors', JSON.stringify(openedDoors));
    localStorage.setItem('adventContent', JSON.stringify(cachedContent));
  }, [openedDoors, cachedContent]);

  const handleDoorClick = async (day: number) => {
    setIsModalOpen(true);
    
    // Check if we already have content
    if (cachedContent[day]) {
      setActiveContent(cachedContent[day]);
      if (!openedDoors.includes(day)) {
        setOpenedDoors(prev => [...prev, day]);
      }
      return;
    }

    // Fetch new content
    setIsLoading(true);
    setActiveContent(null);
    
    try {
      const content = await fetchDayContent(day);
      setCachedContent(prev => ({ ...prev, [day]: content }));
      setActiveContent(content);
      if (!openedDoors.includes(day)) {
        setOpenedDoors(prev => [...prev, day]);
      }
    } catch (error) {
      console.error("Failed to load content", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveContent(null);
  };

  // Generate numbers 1-24
  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-gradient-to-b from-night-blue to-black pb-10">
      <SnowEffect />
      
      {/* Header Section */}
      <header className="pt-10 pb-6 text-center z-10 relative px-4">
        <div className="inline-block relative">
          <svg className="absolute -top-12 -left-8 w-16 h-16 text-advent-gold animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h1 className="text-5xl md:text-7xl font-christmas text-advent-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            Julekalender
          </h1>
        </div>
        <p className="mt-4 text-xl text-blue-100 max-w-lg mx-auto font-light">
          Bli med på reisen mot julenatt og oppdag gaven som varer evig.
        </p>
      </header>

      {/* Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
          {days.map((day) => (
            <Door 
              key={day} 
              day={day} 
              isOpen={openedDoors.includes(day)} 
              onClick={() => handleDoorClick(day)} 
            />
          ))}
        </div>
      </main>

      <div className="mt-12 mb-8 text-center relative z-10 opacity-70">
        <p className="text-advent-gold font-christmas text-lg tracking-widest">Eklund DEsign</p>
      </div>

      {/* Manger Scene Graphic (Footer decoration) */}
      <div className="fixed bottom-0 left-0 w-full h-32 md:h-48 pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full text-black" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
           <path d="M0,200 L1200,200 L1200,150 Q1000,100 800,160 T400,180 T0,140 Z" />
           {/* Simple hills/dunes suggestive of Bethlehem landscape */}
        </svg>
      </div>

      {isModalOpen && (
        <ContentModal 
          content={activeContent} 
          isLoading={isLoading} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default App;