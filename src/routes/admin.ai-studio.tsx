import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Video,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Share2,
  Download,
  Copy,
  Check,
  Building2,
  Languages,
  Wand2,
  Layers,
  Phone,
  Eye,
  Sliders,
  Maximize2,
  Film,
  Plus,
  Trash2,
  Instagram,
  Youtube,
  Tv,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  FileVideo,
  Edit3,
  Scissors,
  Palette,
  Type,
  Music,
  Gauge
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";
import { generateAIScriptFn, publishAIVideoToSocialFn, publishAIVideoToRentalsFn, type GeneratedScript } from "@/api/ai-studio";

export const Route = createFileRoute("/admin/ai-studio")({
  component: AIStudioPage,
});

export interface PropertyConfig {
  id: string;
  name: string;
  location: string;
  type: string;
  price: string;
  rera: string;
  highlights: string[];
  images: string[];
  customVideoUrl?: string;
  isCustom?: boolean;
}

const DEFAULT_PRESETS: PropertyConfig[] = [
  {
    id: "orient-odyssey",
    name: "Orient Odyssey",
    location: "Ghatkopar East, Mumbai",
    type: "Luxury 2 & 3 BHK Apartments",
    price: "₹ 1.91 Cr Onwards",
    rera: "PM1180002600214",
    highlights: ["Twin 22-Storey Landmark Towers", "Panoramic Skyline Views", "Rooftop Sky Lounge & Gym", "5 Mins to Ghatkopar Metro"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"
    ]
  },
  {
    id: "psk-aura",
    name: "PSK Aura",
    location: "Pant Nagar, Ghatkopar East",
    type: "Boutique 2 & 3 BHK High-Rise",
    price: "₹ 2.18 Cr Onwards",
    rera: "P51800080013",
    highlights: ["G+20 Storey Boutique Tower", "Open-to-Sky Podium Garden", "Mini-Theatre & Library", "Vastu Compliant Homes"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
    ]
  },
  {
    id: "emperia-legacy",
    name: "Emperia Legacy",
    location: "Pant Nagar, Ghatkopar East",
    type: "Modern 1 & 2 BHK Residences",
    price: "₹ 1.22 Cr Onwards",
    rera: "PR1180002600209",
    highlights: ["Infinity Swimming Pool", "Rooftop Horizon Cafe", "25+ Lifestyle Amenities", "Near Eastern Express Highway"],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80"
    ]
  }
];

const FILTER_EFFECTS = [
  { id: "none", name: "Natural (Raw)", filter: "none" },
  { id: "gold-luxe", name: "Luxury Gold", filter: "sepia(0.18) contrast(1.12) brightness(1.04) saturate(1.2)" },
  { id: "cinematic", name: "Cinematic Noir", filter: "contrast(1.22) brightness(0.95) saturate(1.15)" },
  { id: "crisp-day", name: "Crisp Daylight", filter: "brightness(1.08) contrast(1.1) saturate(1.05)" },
  { id: "soft-glow", name: "Soft Glow", filter: "brightness(1.05) contrast(1.02) saturate(1.1)" }
];

const STORAGE_KEY = "saverra_custom_ai_projects_v2";

function AIStudioPage() {
  // Load stored custom projects
  const [propertiesList, setPropertiesList] = useState<PropertyConfig[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return [...DEFAULT_PRESETS, ...parsed];
        }
      } catch (e) {
        console.error("Failed to parse custom projects from storage", e);
      }
    }
    return DEFAULT_PRESETS;
  });

  const [selectedProperty, setSelectedProperty] = useState<PropertyConfig>(DEFAULT_PRESETS[0]);
  
  // Custom Property Form State
  const [customName, setCustomName] = useState("");
  const [customLocation, setCustomLocation] = useState("Ghatkopar East, Mumbai");
  const [customType, setCustomType] = useState("Luxury 2 & 3 BHK");
  const [customPrice, setCustomPrice] = useState("₹ 1.85 Cr Onwards");
  const [customHighlights, setCustomHighlights] = useState("Prime Location, Balcony Deck, Rooftop Gym, RERA Verified");
  const [customPrompt, setCustomPrompt] = useState("");
  const [customVideoUrl, setCustomVideoUrl] = useState("");
  const [customImages, setCustomImages] = useState<string[]>([]);
  
  // Video & Editor Settings
  const [format, setFormat] = useState<'reel' | 'landscape'>('reel');
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [activeTab, setActiveTab] = useState<'upload' | 'generator' | 'effects' | 'branding' | 'scenes'>('generator');
  
  // AI Video Effects & Styling
  const [selectedFilter, setSelectedFilter] = useState("gold-luxe");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [textSize, setTextSize] = useState<'compact' | 'medium' | 'minimal'>('compact');
  
  // Branding & Overlays Settings
  const [showWatermark, setShowWatermark] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showContactBar, setShowContactBar] = useState(true);
  const [showReraBadge, setShowReraBadge] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  
  // Script and Scenes
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [totalDuration, setTotalDuration] = useState(28); // seconds

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);

  // Save custom projects to localStorage
  const saveCustomProjects = (newList: PropertyConfig[]) => {
    setPropertiesList(newList);
    if (typeof window !== "undefined") {
      const customOnly = newList.filter(p => p.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    }
  };

  // Initialize Sample Script on Load or Property Change
  useEffect(() => {
    handleGenerateScript();
  }, [selectedProperty, language, format]);

  // Audio speech synthesis setup
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    try {
      const res = await generateAIScriptFn({
        data: {
          propertyName: selectedProperty.name || "Luxury Property",
          propertyType: selectedProperty.type || "Apartment",
          location: selectedProperty.location || "Ghatkopar East, Mumbai",
          price: selectedProperty.price || "Price on Request",
          highlights: selectedProperty.highlights || [],
          language,
          format
        }
      });

      if (res.success && res.data) {
        setScript(res.data);
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to generate AI script");
    } finally {
      setIsGenerating(false);
    }
  };

  // Video Timeline & Scene Progression
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5;
          if (next >= totalDuration) {
            setIsPlaying(false);
            if (synthRef.current) synthRef.current.cancel();
            if (videoElementRef.current) videoElementRef.current.pause();
            return 0;
          }
          return next;
        });
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
      if (videoElementRef.current) videoElementRef.current.pause();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalDuration]);

  // Update current scene based on currentTime
  useEffect(() => {
    if (!script || !script.scenes.length) return;
    const sceneDuration = totalDuration / script.scenes.length;
    const idx = Math.min(
      Math.floor(currentTime / sceneDuration),
      script.scenes.length - 1
    );
    
    if (idx !== currentSceneIdx) {
      setCurrentSceneIdx(idx);
      if (isPlaying && speechEnabled && synthRef.current && script.scenes[idx]) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(script.scenes[idx].narrationText);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        const voices = synthRef.current.getVoices();
        const voice = voices.find(v => v.lang.includes("hi") || v.lang.includes("en-IN") || v.name.includes("India"));
        if (voice) utterance.voice = voice;
        synthRef.current.speak(utterance);
      }
    }
  }, [currentTime, script, totalDuration, isPlaying, speechEnabled, currentSceneIdx]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= totalDuration - 1) {
        setCurrentTime(0);
        if (videoElementRef.current) videoElementRef.current.currentTime = 0;
      }
      setIsPlaying(true);
      if (videoElementRef.current) videoElementRef.current.play();

      if (speechEnabled && synthRef.current && script && script.scenes[currentSceneIdx]) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(script.scenes[currentSceneIdx].narrationText);
        utterance.rate = 1.0;
        const voices = synthRef.current.getVoices();
        const voice = voices.find(v => v.lang.includes("hi") || v.lang.includes("en-IN") || v.name.includes("India"));
        if (voice) utterance.voice = voice;
        synthRef.current.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if (videoElementRef.current) videoElementRef.current.pause();
      if (synthRef.current) synthRef.current.cancel();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSceneIdx(0);
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      videoElementRef.current.currentTime = 0;
    }
    if (synthRef.current) synthRef.current.cancel();
  };

  // Upload Local Video File
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCustomVideoUrl(url);
    setSelectedProperty(prev => ({
      ...prev,
      customVideoUrl: url
    }));
    toast.success(`Video "${file.name}" loaded into editor!`);
  };

  // Upload Local Photos Gallery
  const handleImageFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newUrls.push(URL.createObjectURL(files[i]));
    }

    const updated = [...customImages, ...newUrls];
    setCustomImages(updated);
    setSelectedProperty(prev => ({
      ...prev,
      images: updated.length > 0 ? updated : prev.images
    }));
    toast.success(`${files.length} property photos uploaded!`);
  };

  // Save Custom Property
  const handleCreateCustomProperty = () => {
    if (!customName.trim()) {
      toast.error("Please enter a Property Name");
      return;
    }

    const highlightsArr = customHighlights.split(",").map(s => s.trim()).filter(Boolean);
    const newProp: PropertyConfig = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      location: customLocation.trim(),
      type: customType.trim(),
      price: customPrice.trim(),
      rera: "Verified",
      highlights: highlightsArr.length > 0 ? highlightsArr : ["Prime Location", "Luxury Balcony"],
      images: customImages.length > 0 ? customImages : DEFAULT_PRESETS[0].images,
      customVideoUrl: customVideoUrl || undefined,
      isCustom: true
    };

    const updatedList = [newProp, ...propertiesList];
    saveCustomProjects(updatedList);
    setSelectedProperty(newProp);
    setCustomName("");
    setCustomImages([]);
    setCustomVideoUrl("");
    setActiveTab('generator');
    toast.success(`"${newProp.name}" created and saved!`);
  };

  // Delete Project / Card
  const handleDeleteProperty = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = propertiesList.filter(p => p.id !== idToDelete);
    saveCustomProjects(filtered);
    if (selectedProperty.id === idToDelete) {
      setSelectedProperty(filtered[0] || DEFAULT_PRESETS[0]);
    }
    toast.success("Project removed successfully!");
  };

  const handlePublishToSocial = async () => {
    if (!script) return;
    try {
      const res = await publishAIVideoToSocialFn({
        data: {
          platform: format === 'reel' ? 'instagram' : 'youtube',
          url: `https://saverrarealty.com/projects/${selectedProperty.id}`,
          embed_id: selectedProperty.id,
          title: script.title
        }
      });
      if (res.success) {
        toast.success("Published successfully to Saverra Social Wall! 🎉");
      } else {
        toast.error("Failed to publish");
      }
    } catch (e: any) {
      toast.error(e.message || "Publish error");
    }
  };

  const handleCopyCaption = () => {
    if (!script) return;
    const text = `${script.title}\n\n📍 ${selectedProperty.location}\n💰 ${selectedProperty.price}\n\n${script.hook}\n\n${script.callToAction}\n\n${script.hashtags.join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    toast.success("Reel Caption & Hashtags copied to clipboard!");
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const activeImage = selectedProperty.images[currentSceneIdx % selectedProperty.images.length] || selectedProperty.images[0];
  const activeScene = script?.scenes[currentSceneIdx];
  const currentFilterStyle = FILTER_EFFECTS.find(f => f.id === selectedFilter)?.filter || "none";

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[color:var(--navy-deep)] text-white p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-0.5 text-[11px] font-semibold text-gold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> Full AI Video & Reels Editor
            </span>
            <Badge variant="outline" className="text-white border-white/20 text-[10px]">
              CRUD + AI Effects + Clean Typography
            </Badge>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            AI Video & Reels Studio
          </h1>
          <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">
            Upload custom raw videos or photos, edit with AI color filters, compact luxury text overlays, auto voiceover, and manage all your video projects easily.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10">
          <Button
            variant="gold"
            onClick={() => setActiveTab('upload')}
            className="shadow-lg font-semibold tracking-wider text-xs uppercase"
          >
            <Plus className="size-3.5 mr-1.5" />
            New Video Project
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Controls & Full Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex bg-white rounded-xl p-1.5 border border-border shadow-sm gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'generator'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Building2 className="size-3.5" /> Projects ({propertiesList.length})
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'upload'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Upload className="size-3.5" /> Upload Media
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'effects'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Palette className="size-3.5" /> AI Effects
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'branding'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Sliders className="size-3.5" /> Overlays
            </button>
            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'scenes'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Film className="size-3.5" /> Storyboard
            </button>
          </div>

          {/* Tab 1: Property Selector & Full CRUD Manager */}
          {activeTab === 'generator' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    1. Select Video Project to Edit
                  </Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab('upload')}
                    className="h-7 text-[11px] gap-1 border-gold text-gold hover:bg-gold/10"
                  >
                    <Plus className="size-3" /> Add Custom Property
                  </Button>
                </div>

                {/* Grid of Projects with Delete buttons */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {propertiesList.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => {
                        setSelectedProperty(prop);
                        setCurrentTime(0);
                        setCurrentSceneIdx(0);
                        if (prop.customVideoUrl) setCustomVideoUrl(prop.customVideoUrl);
                      }}
                      className={`relative group text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedProperty.id === prop.id
                          ? 'border-gold bg-gold/5 ring-2 ring-gold/20 shadow-sm'
                          : 'border-border hover:border-border/80 bg-muted/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-bold text-xs text-primary truncate max-w-[110px]">{prop.name}</p>
                        <div className="flex items-center gap-1">
                          {prop.customVideoUrl && (
                            <Badge variant="outline" className="text-[8px] bg-blue-50 text-blue-700 border-blue-200 py-0 px-1">
                              Video
                            </Badge>
                          )}
                          {/* Delete Button (visible on hover / touch) */}
                          <button
                            onClick={(e) => handleDeleteProperty(prop.id, e)}
                            title="Delete this project"
                            className="p-1 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mt-1">{prop.location}</p>
                      <p className="text-[10px] font-semibold text-gold mt-2">{prop.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format & Language Selection */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Video Aspect Ratio
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFormat('reel')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                        format === 'reel'
                          ? 'border-gold bg-gold/10 font-bold text-primary'
                          : 'border-border hover:bg-muted/40 text-muted-foreground'
                      }`}
                    >
                      <Instagram className="size-3.5 text-pink-600" />
                      9:16 Reel / Short
                    </button>
                    <button
                      onClick={() => setFormat('landscape')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                        format === 'landscape'
                          ? 'border-gold bg-gold/10 font-bold text-primary'
                          : 'border-border hover:bg-muted/40 text-muted-foreground'
                      }`}
                    >
                      <Tv className="size-3.5 text-blue-600" />
                      16:9 Landscape
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                    AI Script Language
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hinglish', label: 'Hinglish' },
                      { id: 'hindi', label: 'हिंदी' },
                      { id: 'english', label: 'English' }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setLanguage(lang.id as any)}
                        className={`p-3 rounded-xl border text-xs text-center transition-all ${
                          language === lang.id
                            ? 'border-gold bg-gold/10 font-bold text-primary'
                            : 'border-border hover:bg-muted/40 text-muted-foreground'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hook & Selling Pitch Preview */}
              {script && (
                <div className="p-4 bg-muted/30 rounded-xl border border-border/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                      <Sparkles className="size-3" /> AI Opening Hook
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleGenerateScript}
                      disabled={isGenerating}
                      className="h-6 text-[10px] text-primary"
                    >
                      {isGenerating ? "Regenerating..." : "Regenerate Script"}
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-primary italic">
                    "{script.hook}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Upload Custom Video / Photos & Create New Project */}
          {activeTab === 'upload' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-primary">
                  Create New Video / Upload Media
                </h3>
                <p className="text-xs text-muted-foreground">
                  Upload raw phone/camera video or property images to edit with AI.
                </p>
              </div>

              {/* Upload Video Box */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-border/80 bg-muted/20 space-y-3">
                <div className="flex items-center gap-2">
                  <FileVideo className="size-4 text-gold" />
                  <Label className="text-xs font-bold uppercase tracking-wider text-primary">
                    1. Upload Raw Video File
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    ref={videoFileInputRef}
                    accept="video/*"
                    onChange={handleVideoFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => videoFileInputRef.current?.click()}
                    className="w-full sm:w-auto text-xs font-semibold gap-2 border-primary/20 hover:bg-primary/5"
                  >
                    <Upload className="size-3.5" /> Select Video File From Phone / PC
                  </Button>

                  <span className="text-xs text-muted-foreground">or</span>

                  <Input
                    placeholder="Paste Direct Video URL / MP4 link..."
                    value={customVideoUrl}
                    onChange={(e) => {
                      setCustomVideoUrl(e.target.value);
                      setSelectedProperty(prev => ({ ...prev, customVideoUrl: e.target.value }));
                    }}
                    className="flex-1 h-9 text-xs bg-white"
                  />
                </div>

                {customVideoUrl && (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-lg text-xs">
                    <span className="font-medium flex items-center gap-1.5">
                      <Check className="size-3.5 text-emerald-600" /> Video Loaded in Canvas
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setCustomVideoUrl("");
                        setSelectedProperty(prev => ({ ...prev, customVideoUrl: undefined }));
                      }}
                      className="h-6 text-red-600 hover:text-red-700 text-xs p-1"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Upload Photos Box */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-border/80 bg-muted/20 space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="size-4 text-gold" />
                  <Label className="text-xs font-bold uppercase tracking-wider text-primary">
                    2. Upload Property Photos
                  </Label>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleImageFilesUpload}
                  className="hidden"
                />

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold gap-2 border-primary/20 hover:bg-primary/5"
                >
                  <Upload className="size-3.5" /> Choose Photos (Living Room, Bedroom, Balcony)
                </Button>

                {customImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {customImages.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-border group">
                        <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                        <button
                          onClick={() => {
                            const filtered = customImages.filter((_, idx) => idx !== i);
                            setCustomImages(filtered);
                            setSelectedProperty(prev => ({ ...prev, images: filtered.length > 0 ? filtered : DEFAULT_PRESETS[0].images }));
                          }}
                          className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Info Form */}
              <div className="border-t border-border pt-4 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  3. Property Details for AI Script
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Property / Project Name *</Label>
                    <Input
                      placeholder="e.g. Godrej Horizon / Luxury 3 BHK"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Location</Label>
                    <Input
                      placeholder="e.g. Tilak Road, Ghatkopar East"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Configuration</Label>
                    <Input
                      placeholder="e.g. 2 & 3 BHK Balcony Homes"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Price</Label>
                    <Input
                      placeholder="e.g. ₹ 2.15 Cr Onwards"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Key Selling Highlights</Label>
                  <Input
                    placeholder="e.g. Uninterrupted Views, Rooftop Deck, 5 Min Metro, Grand Lobby"
                    value={customHighlights}
                    onChange={(e) => setCustomHighlights(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>

                <Button
                  variant="gold"
                  onClick={handleCreateCustomProperty}
                  className="w-full text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  <Sparkles className="size-3.5 mr-2" /> Save & Edit In AI Video Studio
                </Button>
              </div>
            </div>
          )}

          {/* Tab 3: AI Effects & Color Grading */}
          {activeTab === 'effects' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-primary">
                  AI Color Grading & Video Effects
                </h3>
                <p className="text-xs text-muted-foreground">
                  Apply instant luxury real estate color grading filters and motion speeds.
                </p>
              </div>

              {/* Color Grading Filter Options */}
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Color Grading Filter
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FILTER_EFFECTS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedFilter === f.id
                          ? 'border-gold bg-gold/10 font-bold text-primary ring-1 ring-gold shadow-sm'
                          : 'border-border hover:bg-muted/40 text-muted-foreground'
                      }`}
                    >
                      <p className="text-xs">{f.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion & Speed */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Playback Speed
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { rate: 0.75, label: "0.75x Slow" },
                      { rate: 1.0, label: "1.0x Normal" },
                      { rate: 1.25, label: "1.25x Fast" }
                    ].map((sp) => (
                      <button
                        key={sp.rate}
                        onClick={() => {
                          setPlaybackSpeed(sp.rate);
                          if (videoElementRef.current) videoElementRef.current.playbackRate = sp.rate;
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          playbackSpeed === sp.rate
                            ? 'border-gold bg-gold/10 font-bold text-primary'
                            : 'border-border hover:bg-muted/40 text-muted-foreground'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Subtitle Font Size
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "compact", label: "Compact (Sleek)" },
                      { id: "minimal", label: "Minimal" },
                      { id: "medium", label: "Medium" }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTextSize(t.id as any)}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          textSize === t.id
                            ? 'border-gold bg-gold/10 font-bold text-primary'
                            : 'border-border hover:bg-muted/40 text-muted-foreground'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Brand Overlays & Watermarking */}
          {activeTab === 'branding' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-5">
              <h3 className="font-display text-base font-bold text-primary">
                Brand & Audio Overlays
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                  <div>
                    <p className="font-bold text-xs text-primary">Saverra Gold Logo</p>
                    <p className="text-[11px] text-muted-foreground">Watermark in upper left corner</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showWatermark}
                    onChange={(e) => setShowWatermark(e.target.checked)}
                    className="size-4 accent-[color:var(--gold)] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                  <div>
                    <p className="font-bold text-xs text-primary">Animated Gold Subtitles</p>
                    <p className="text-[11px] text-muted-foreground">Clean luxury on-screen badges</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showCaptions}
                    onChange={(e) => setShowCaptions(e.target.checked)}
                    className="size-4 accent-[color:var(--gold)] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                  <div>
                    <p className="font-bold text-xs text-primary">Contact & Website Bar</p>
                    <p className="text-[11px] text-muted-foreground">+91 86918 66691 bottom badge</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showContactBar}
                    onChange={(e) => setShowContactBar(e.target.checked)}
                    className="size-4 accent-[color:var(--gold)] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                  <div>
                    <p className="font-bold text-xs text-primary">MahaRERA Badge</p>
                    <p className="text-[11px] text-muted-foreground">Verified registration stamp</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showReraBadge}
                    onChange={(e) => setShowReraBadge(e.target.checked)}
                    className="size-4 accent-[color:var(--gold)] cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-3 border-t border-border">
                <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-gold/5 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/20 rounded-lg text-gold">
                      {speechEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-primary">AI Voiceover Narration</p>
                      <p className="text-[11px] text-muted-foreground">Speaks Hindi/English property points during playback</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={speechEnabled}
                    onChange={(e) => {
                      setSpeechEnabled(e.target.checked);
                      if (!e.target.checked && synthRef.current) synthRef.current.cancel();
                    }}
                    className="size-4 accent-[color:var(--gold)] cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Tab 5: Storyboard & Scenes Editor */}
          {activeTab === 'scenes' && script && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-display text-base font-bold text-primary">
                    Storyboard Sequence ({script.scenes.length} Scenes)
                  </h3>
                  <p className="text-xs text-muted-foreground">Edit narration text or click scene to jump timeline.</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newScene = {
                      time: "0:25 - 0:30",
                      visualDescription: "Closing CTA Shot",
                      narrationText: `Visit saverrarealty.com or call +91 86918 66691 to book your site visit for ${selectedProperty.name}!`,
                      onScreenCaption: `Contact Saverra Realty`
                    };
                    setScript({ ...script, scenes: [...script.scenes, newScene] });
                    toast.success("New scene added to storyboard!");
                  }}
                  className="h-8 text-xs gap-1 border-gold text-gold"
                >
                  <Plus className="size-3" /> Add Scene
                </Button>
              </div>

              <div className="space-y-3">
                {script.scenes.map((sc, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const sceneTime = (totalDuration / script.scenes.length) * i;
                      setCurrentTime(sceneTime);
                      setCurrentSceneIdx(i);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      currentSceneIdx === i
                        ? 'border-gold bg-gold/5 ring-1 ring-gold shadow-sm'
                        : 'border-border hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`text-[10px] ${currentSceneIdx === i ? 'bg-gold text-black font-bold' : ''}`}>
                        Scene {i + 1} ({sc.time})
                      </Badge>
                      <Input
                        value={sc.onScreenCaption}
                        onChange={(e) => {
                          const updated = [...script.scenes];
                          updated[i].onScreenCaption = e.target.value;
                          setScript({ ...script, scenes: updated });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="On-Screen Caption"
                        className="h-7 text-xs font-bold text-gold max-w-[220px] bg-white"
                      />
                    </div>
                    <Textarea
                      value={sc.narrationText}
                      onChange={(e) => {
                        const updated = [...script.scenes];
                        updated[i].narrationText = e.target.value;
                        setScript({ ...script, scenes: updated });
                      }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Narration Text"
                      className="text-xs text-primary font-medium resize-none min-h-[55px] bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Actions & Copy Bar */}
          <div className="bg-white p-6 rounded-2xl border border-border/70 shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
              Publish & Social Distribution Actions
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="gold"
                onClick={handlePublishToSocial}
                className="flex-1 min-w-[180px] text-xs font-bold tracking-wider uppercase shadow-md"
              >
                <Share2 className="size-3.5 mr-2" />
                Publish to Social Wall
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyCaption}
                className="flex-1 min-w-[180px] text-xs font-semibold tracking-wider uppercase border-border hover:bg-muted"
              >
                {copiedCaption ? <Check className="size-3.5 mr-2 text-emerald-600" /> : <Copy className="size-3.5 mr-2" />}
                {copiedCaption ? "Copied!" : "Copy Reel Caption"}
              </Button>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Real-Time Video Preview Canvas (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Eye className="size-3.5 text-gold" /> Real-Time Video Canvas
            </span>
            <Badge variant="outline" className="text-[10px] bg-white border-border">
              {format === 'reel' ? '9:16 (1080x1920)' : '16:9 (1920x1080)'}
            </Badge>
          </div>

          {/* Video Player Wrapper */}
          <div className="bg-slate-950 rounded-3xl p-3 shadow-2xl border border-slate-800 flex justify-center">
            
            <div
              className={`relative overflow-hidden rounded-2xl bg-black transition-all duration-300 select-none ${
                format === 'reel'
                  ? 'w-full max-w-[320px] aspect-[9/16]'
                  : 'w-full aspect-[16/9]'
              }`}
            >
              {/* Media Layer: Custom Video OR Smooth Image Slideshow with AI Color Filter */}
              {selectedProperty.customVideoUrl ? (
                <video
                  ref={videoElementRef}
                  src={selectedProperty.customVideoUrl}
                  playsInline
                  loop
                  muted
                  style={{ filter: currentFilterStyle }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={activeImage}
                    alt={selectedProperty.name}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                      isPlaying ? 'scale-115 translate-x-1' : 'scale-100'
                    }`}
                    style={{
                      filter: currentFilterStyle !== 'none' ? currentFilterStyle : 'brightness(0.94) contrast(1.05)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/50 pointer-events-none" />
                </div>
              )}

              {/* OVERLAY 1: Top Watermark & Saverra Logo */}
              {showWatermark && (
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-md">
                  <Logo hideText={true} variant="light" className="h-4 w-3.5" />
                  <span className="text-[9px] font-bold text-white tracking-widest uppercase">
                    SAVERRA <span className="text-gold">REALTY</span>
                  </span>
                </div>
              )}

              {/* OVERLAY 2: MahaRERA Badge Top Right */}
              {showReraBadge && (
                <div className="absolute top-3.5 right-3.5 z-20 bg-gold/95 text-[color:var(--navy-deep)] px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wider uppercase shadow-md backdrop-blur-sm">
                  RERA APPROVED
                </div>
              )}

              {/* OVERLAY 3: Clean, Compact Gold Subtitle Banner */}
              {showCaptions && activeScene && (
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 z-20 text-center animate-fade-up">
                  <div className="inline-block bg-black/75 backdrop-blur-md border border-gold/40 px-3 py-1.5 rounded-lg shadow-2xl max-w-[90%]">
                    <p className="text-[9px] text-gold font-bold tracking-widest uppercase truncate mb-0.5">
                      {selectedProperty.name}
                    </p>
                    <p className={`font-extrabold text-white tracking-wide drop-shadow-md ${
                      textSize === 'compact' ? 'text-xs' : textSize === 'minimal' ? 'text-[11px]' : 'text-sm'
                    }`}>
                      {activeScene.onScreenCaption}
                    </p>
                  </div>
                </div>
              )}

              {/* OVERLAY 4: Bottom Content & Contact Info Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 z-20 space-y-2.5">
                
                {/* Spoken Narration Subtitle Snippet */}
                {activeScene && (
                  <p className="text-white/90 text-[11px] font-light text-center line-clamp-2 drop-shadow-md px-1">
                    "{activeScene.narrationText}"
                  </p>
                )}

                {/* Bottom Contact Pill */}
                {showContactBar && (
                  <div className="bg-[color:var(--navy-deep)]/95 border border-gold/40 text-white rounded-lg p-2 flex items-center justify-between shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="size-5 bg-gold rounded-full flex items-center justify-center text-[color:var(--navy-deep)]">
                        <Phone className="size-2.5" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-[9px] font-bold text-white">+91 86918 66691</p>
                        <p className="text-[7px] text-white/70">saverrarealty.com</p>
                      </div>
                    </div>
                    <span className="text-[8px] font-extrabold text-gold bg-white/10 px-1.5 py-0.5 rounded uppercase">
                      Book Visit
                    </span>
                  </div>
                )}

                {/* Timeline Progress Bar */}
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-yellow-400 transition-all duration-300"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Player Controls */}
          <div className="bg-white p-3.5 rounded-2xl border border-border shadow-sm flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="gold"
                onClick={togglePlay}
                className="size-9 rounded-full shadow-md"
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={handleReset}
                className="size-8 rounded-full border-border text-muted-foreground hover:text-primary"
                title="Reset Timeline"
              >
                <RotateCcw className="size-3" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold text-primary font-mono">
                00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:{totalDuration}
              </p>
              <p className="text-[9px] text-muted-foreground">
                Scene {currentSceneIdx + 1} of {script?.scenes.length || 4}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setSpeechEnabled(!speechEnabled);
                  if (speechEnabled && synthRef.current) synthRef.current.cancel();
                }}
                className={`size-8 rounded-full ${speechEnabled ? 'text-gold' : 'text-muted-foreground'}`}
                title="Toggle AI Speech"
              >
                {speechEnabled ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
              </Button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
