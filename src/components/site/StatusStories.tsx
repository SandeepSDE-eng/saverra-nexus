import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActiveStatusesFn } from "@/api/announcements";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

export function StatusStories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const { data: statuses, isLoading } = useQuery({
    queryKey: ["active_statuses"],
    queryFn: async () => {
      const res = await getActiveStatusesFn();
      if (!res.success) return [];
      return res.data;
    }
  });

  if (isLoading || !statuses || statuses.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStoryIndex !== null && activeStoryIndex < statuses.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null); // Close if last
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  return (
    <>
      {/* Story Bubbles */}
      <div className="w-full bg-white border-b border-border/50 py-4 shadow-sm mb-8 overflow-x-auto scrollbar-none">
        <div className="container-luxe flex gap-4 px-4 md:px-8">
          {statuses.map((s: any, idx: number) => (
            <div 
              key={s.id} 
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 group"
              onClick={() => setActiveStoryIndex(idx)}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-gold to-orange-500 shadow-md transform transition-transform group-hover:scale-105">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                  <img src={s.image_url} alt={s.title || 'Status'} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-medium text-muted-foreground truncate w-16 md:w-20 text-center">
                {s.title || 'Update'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Story Viewer */}
      {activeStoryIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <button 
            onClick={() => setActiveStoryIndex(null)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
          >
            <X className="size-6" />
          </button>

          <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            <img 
              src={statuses[activeStoryIndex].image_url} 
              alt="Status View" 
              className="w-full h-full object-contain"
            />
            
            {statuses[activeStoryIndex].title && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 text-center">
                <p className="text-white font-medium">{statuses[activeStoryIndex].title}</p>
              </div>
            )}

            {/* Navigation Overlays */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer group flex items-center p-2"
              onClick={handlePrev}
            >
              {activeStoryIndex > 0 && <ChevronLeft className="size-8 text-white/50 group-hover:text-white transition-colors" />}
            </div>
            
            <div 
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer group flex items-center justify-end p-2"
              onClick={handleNext}
            >
              <ChevronRight className="size-8 text-white/50 group-hover:text-white transition-colors" />
            </div>

            {/* Progress Bar (Visual Only) */}
            <div className="absolute top-2 inset-x-2 flex gap-1 z-20">
              {statuses.map((_: any, i: number) => (
                <div key={i} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
                  <div className={`h-full bg-white rounded-full ${i === activeStoryIndex ? 'w-full' : i < activeStoryIndex ? 'w-full' : 'w-0'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
