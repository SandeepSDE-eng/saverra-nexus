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
  Tv
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

// Sample properties with curated high-res interior/exterior gallery photos
const PRESET_PROPERTIES = [
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

function AIStudioPage() {
  const [selectedProperty, setSelectedProperty] = useState(PRESET_PROPERTIES[0]);
  const [format, setFormat] = useState<'reel' | 'landscape'>('reel');
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [activeTab, setActiveTab] = useState<'generator' | 'branding' | 'scenes' | 'preview'>('generator');
  
  // Branding & Overlays Settings
  const [showWatermark, setShowWatermark] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showContactBar, setShowContactBar] = useState(true);
  const [showReraBadge, setShowReraBadge] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
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

  // Initialize Sample Script on Load
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
          propertyName: selectedProperty.name,
          propertyType: selectedProperty.type,
          location: selectedProperty.location,
          price: selectedProperty.price,
          highlights: selectedProperty.highlights,
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
            return 0;
          }
          return next;
        });
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
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
      // Speak the narration text for this scene if enabled
      if (isPlaying && speechEnabled && synthRef.current && script.scenes[idx]) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(script.scenes[idx].narrationText);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        // Try finding Indian English or Hindi voice
        const voices = synthRef.current.getVoices();
        const voice = voices.find(v => v.lang.includes("hi") || v.lang.includes("en-IN") || v.name.includes("India"));
        if (voice) utterance.voice = voice;
        synthRef.current.speak(utterance);
      }
    }
  }, [currentTime, script, totalDuration, isPlaying, speechEnabled, currentSceneIdx]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= totalDuration - 1) setCurrentTime(0);
      setIsPlaying(true);
      // Trigger voice for scene 0
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
      if (synthRef.current) synthRef.current.cancel();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSceneIdx(0);
    if (synthRef.current) synthRef.current.cancel();
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

  const activeImage = selectedProperty.images[currentSceneIdx % selectedProperty.images.length];
  const activeScene = script?.scenes[currentSceneIdx];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[color:var(--navy-deep)] text-white p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-0.5 text-[11px] font-semibold text-gold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> AI Media Engine
            </span>
            <Badge variant="outline" className="text-white border-white/20 text-[10px]">
              v2.4 Pro
            </Badge>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            AI Video & Reels Studio
          </h1>
          <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">
            Generate high-converting luxury property walkthroughs, YouTube Shorts, and Instagram Reels with AI scriptwriting, voiceover & brand watermarks.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10">
          <Button
            variant="gold"
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="shadow-lg font-semibold tracking-wider text-xs uppercase"
          >
            <Wand2 className="size-3.5 mr-1.5" />
            {isGenerating ? "Generating AI Reel..." : "Regenerate AI Reel"}
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Controls & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex bg-white rounded-xl p-1.5 border border-border shadow-sm gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'generator'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Wand2 className="size-3.5" /> Property & Script
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'branding'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Sliders className="size-3.5" /> Brand Overlays
            </button>
            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'scenes'
                  ? 'bg-[color:var(--navy-deep)] text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Film className="size-3.5" /> Storyboard ({script?.scenes.length || 0})
            </button>
          </div>

          {/* Tab 1: Property & Script Generator */}
          {activeTab === 'generator' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-6">
              
              {/* Quick Select Preset Properties */}
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  1. Select Property
                </Label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {PRESET_PROPERTIES.map((prop) => (
                    <button
                      key={prop.id}
                      onClick={() => {
                        setSelectedProperty(prop);
                        setCurrentTime(0);
                        setCurrentSceneIdx(0);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        selectedProperty.id === prop.id
                          ? 'border-gold bg-gold/5 ring-2 ring-gold/20 shadow-sm'
                          : 'border-border hover:border-border/80 bg-muted/20'
                      }`}
                    >
                      <p className="font-bold text-xs text-primary truncate">{prop.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">{prop.location}</p>
                      <p className="text-[10px] font-semibold text-gold mt-2">{prop.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format & Language Selection */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Video Format
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
                    <Badge variant="outline" className="text-[10px] bg-white">
                      Instant Engagement
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-primary italic">
                    "{script.hook}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Brand Overlays & Watermarking */}
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
                    <p className="text-[11px] text-muted-foreground">Reels-style on-screen captions</p>
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
                      <p className="text-[11px] text-muted-foreground">Speaks the Hindi / English script during video playback</p>
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

          {/* Tab 3: Storyboard & Scenes List */}
          {activeTab === 'scenes' && script && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/70 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-base font-bold text-primary">
                  Storyboard Sequence ({script.scenes.length} Scenes)
                </h3>
                <span className="text-xs text-muted-foreground">Click scene to jump timeline</span>
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
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant="outline" className={`text-[10px] ${currentSceneIdx === i ? 'bg-gold text-black font-bold' : ''}`}>
                        Scene {i + 1} ({sc.time})
                      </Badge>
                      <span className="text-[11px] text-gold font-semibold uppercase">{sc.onScreenCaption}</span>
                    </div>
                    <p className="text-xs text-primary font-medium">{sc.narrationText}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Actions & Copy Bar */}
          <div className="bg-white p-6 rounded-2xl border border-border/70 shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
              Publish & Distribution Actions
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
              {/* Background Image with Ken-Burns Motion Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={activeImage}
                  alt={selectedProperty.name}
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                    isPlaying ? 'scale-115 translate-x-1' : 'scale-100'
                  }`}
                  style={{
                    filter: 'brightness(0.92) contrast(1.05)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />
              </div>

              {/* OVERLAY 1: Top Watermark & Saverra Logo */}
              {showWatermark && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Logo hideText={true} variant="light" className="h-5 w-4" />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                    SAVERRA <span className="text-gold">REALTY</span>
                  </span>
                </div>
              )}

              {/* OVERLAY 2: MahaRERA Badge Top Right */}
              {showReraBadge && (
                <div className="absolute top-4 right-4 z-20 bg-gold/90 text-[color:var(--navy-deep)] px-2.5 py-1 rounded-md text-[9px] font-extrabold tracking-wider uppercase shadow-md backdrop-blur-sm">
                  RERA APPROVED
                </div>
              )}

              {/* OVERLAY 3: Center Animated Gold Captions / Subtitles */}
              {showCaptions && activeScene && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 text-center animate-fade-up">
                  <div className="inline-block bg-black/70 backdrop-blur-md border border-gold/40 px-4 py-2 rounded-xl shadow-2xl">
                    <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-0.5">
                      {selectedProperty.name}
                    </p>
                    <p className="text-sm font-extrabold text-white tracking-wide drop-shadow-md">
                      {activeScene.onScreenCaption}
                    </p>
                  </div>
                </div>
              )}

              {/* OVERLAY 4: Bottom Content & Contact Info Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-20 space-y-3">
                
                {/* Spoken Narration Subtitle Snippet */}
                {activeScene && (
                  <p className="text-white/90 text-xs font-light text-center line-clamp-2 drop-shadow-md px-2">
                    "{activeScene.narrationText}"
                  </p>
                )}

                {/* Bottom Contact Pill */}
                {showContactBar && (
                  <div className="bg-[color:var(--navy-deep)]/95 border border-gold/40 text-white rounded-xl p-2.5 flex items-center justify-between shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="size-6 bg-gold rounded-full flex items-center justify-center text-[color:var(--navy-deep)]">
                        <Phone className="size-3" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-[10px] font-bold text-white">+91 86918 66691</p>
                        <p className="text-[8px] text-white/70">saverrarealty.com</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold text-gold bg-white/10 px-2 py-0.5 rounded uppercase">
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
          <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="gold"
                onClick={togglePlay}
                className="size-10 rounded-full shadow-md"
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={handleReset}
                className="size-9 rounded-full border-border text-muted-foreground hover:text-primary"
                title="Reset Timeline"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold text-primary font-mono">
                00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:{totalDuration}
              </p>
              <p className="text-[10px] text-muted-foreground">
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
                className={`size-9 rounded-full ${speechEnabled ? 'text-gold' : 'text-muted-foreground'}`}
                title="Toggle AI Speech"
              >
                {speechEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </Button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
