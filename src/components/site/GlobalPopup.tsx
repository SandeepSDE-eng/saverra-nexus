import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActivePopupFn } from "@/api/announcements";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: popups, isLoading } = useQuery({
    queryKey: ["active_popup"],
    queryFn: async () => {
      const res = await getActivePopupFn();
      if (!res.success) return [];
      return res.data;
    }
  });

  useEffect(() => {
    // Only show if there are active popups and we haven't seen them in this session
    if (popups && popups.length > 0 && !isLoading && !hasSeen) {
      // Check session storage so it doesn't annoy the user on every page load
      // Combine all active IDs to know if they've seen this exact combination
      const currentIds = popups.map((p: any) => p.id).join(",");
      const seenIds = sessionStorage.getItem("seen_popups_ids");
      
      if (seenIds !== currentIds) {
        // Small delay so it pops up after initial page render
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [popups, isLoading, hasSeen]);

  // Auto-play for carousel
  useEffect(() => {
    if (!isOpen || !popups || popups.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popups.length);
    }, 5000); // 5 seconds per slide
    
    return () => clearInterval(timer);
  }, [isOpen, popups]);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeen(true);
    if (popups && popups.length > 0) {
      const currentIds = popups.map((p: any) => p.id).join(",");
      sessionStorage.setItem("seen_popups_ids", currentIds);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (popups) setCurrentIndex((prev) => (prev + 1) % popups.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (popups) setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
  };

  if (!popups || popups.length === 0 || !isOpen) return null;

  const currentPopup = popups[currentIndex];

  const content = (
    <div className="relative w-full max-w-lg md:max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClose();
        }}
        className="absolute top-4 right-4 z-[60] bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
      >
        <X className="size-5" />
      </button>
      
      <div className="relative w-full h-auto max-h-[80vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${popups.length * 100}%` }}
        >
          {popups.map((p: any) => (
            <div key={p.id} className="w-full flex-shrink-0 flex items-center justify-center">
              <img 
                src={p.image_url} 
                alt="Announcement" 
                className="w-full h-auto object-contain max-h-[80vh]"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {popups.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="size-6" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
              {popups.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`size-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gold w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg md:max-w-2xl mx-auto">
        {currentPopup.link_url ? (
          <a href={currentPopup.link_url} onClick={() => {
            // Still close the popup if they click the link
            setHasSeen(true);
            const currentIds = popups.map((p: any) => p.id).join(",");
            sessionStorage.setItem("seen_popups_ids", currentIds);
          }} className="block">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
