import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActivePopupFn } from "@/api/announcements";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  const { data: popup, isLoading } = useQuery({
    queryKey: ["active_popup"],
    queryFn: async () => {
      const res = await getActivePopupFn();
      if (!res.success) return null;
      return res.data;
    }
  });

  useEffect(() => {
    // Only show if there is an active popup and we haven't seen it in this session
    if (popup && !isLoading && !hasSeen) {
      // Check session storage so it doesn't annoy the user on every page load
      const seenId = sessionStorage.getItem("seen_popup_id");
      if (seenId !== String(popup.id)) {
        // Small delay so it pops up after initial page render
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [popup, isLoading, hasSeen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeen(true);
    if (popup) {
      sessionStorage.setItem("seen_popup_id", String(popup.id));
    }
  };

  if (!popup || !isOpen) return null;

  const content = (
    <div className="relative w-full max-w-lg md:max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
      <button 
        onClick={(e) => {
          e.preventDefault();
          handleClose();
        }}
        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
      >
        <X className="size-5" />
      </button>
      
      <div className="w-full h-auto max-h-[80vh] flex items-center justify-center bg-gray-50">
        <img 
          src={popup.image_url} 
          alt="Announcement" 
          className="w-full h-auto object-contain max-h-[80vh]"
        />
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
        {popup.link_url ? (
          <a href={popup.link_url} onClick={() => {
            // Still close the popup if they click the link
            setHasSeen(true);
            sessionStorage.setItem("seen_popup_id", String(popup.id));
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
