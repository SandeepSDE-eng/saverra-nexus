import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Welcome to Saverra Realty! 👋 How can I help you find your dream home today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsOpen(true);
    }, 5000); // Pops up after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Chat request failed");
      const data = await response.json();
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      
      // Fallback: Comprehensive Regex matching (Active if AI API fails)
      setTimeout(() => {
        setIsTyping(false);
        const lowerText = userMessage.text.toLowerCase();
        let botReply = "I specialize exclusively in Saverra Realty's premium properties. To give you the exact details you need, could you share your 10-digit mobile number? Our senior property consultant will call you right away.";
        
        if (lowerText.match(/\b(hi|hello|hey|namaste|good morning|good evening)\b/)) {
          botReply = "Hello! I am your AI assistant at Saverra Realty. Are you looking to buy a new property, or just exploring our premium portfolio?";
        } 
        else if (userMessage.text.match(/\b\d{10}\b/)) {
          botReply = "Thanks for providing your number! Our senior agent will call you within 5 minutes to discuss your requirements.";
        } 
        else if (lowerText.includes("ghatkopar")) {
          botReply = "Ghatkopar East is a prime location! We have highly sought-after premium projects there, like 'f Residences' and 'MICL Aaradhya'. Are you looking for a 2BHK or a 3BHK?";
        }
        else if (lowerText.includes("bengaluru") || lowerText.includes("bangalore")) {
          botReply = "We have magnificent ultra-luxury villas and apartments in Bengaluru. What specific area or budget are you targeting?";
        }
        else if (lowerText.match(/(price|cost|budget|crore|lakh|cr)/)) {
          botReply = "Our premium properties typically range from ₹1.5 Cr to over ₹5 Cr, depending on the location and amenities. What is your preferred budget?";
        }
        else if (lowerText.match(/(bhk|bedroom|flat|apartment|villa|house|home)/)) {
          botReply = "We offer ultra-luxurious 2BHK, 3BHK, and 4+ BHK residences, as well as premium villas. Do you have a specific location in mind?";
        }
        else if (lowerText.match(/(amenities|pool|gym|club|parking|garden)/)) {
          botReply = "All our premium properties feature world-class amenities including infinity pools, state-of-the-art gymnasiums, smart home tech, and multi-tier security. Would you like to schedule a site visit to experience it?";
        }
        else if (lowerText.match(/(visit|see|schedule|tour|book)/)) {
          botReply = "I'd be happy to arrange a VIP site visit for you. Please drop your 10-digit mobile number here, and our team will coordinate a convenient time.";
        }
        else if (lowerText.match(/(brochure|pdf|details|download|info)/)) {
          botReply = "You can download the brochure directly from the project section above. If you'd like me to WhatsApp it to you, just share your 10-digit mobile number!";
        }
        else if (lowerText.match(/\b(yes|yeah|yep|sure|ok|when|how|why)\b/)) {
          botReply = "Got it. Please provide your 10-digit mobile number or email so our property advisor can connect with you directly to answer that thoroughly.";
        }
        else if (lowerText.match(/\b(no|nope|not now)\b/)) {
          botReply = "No problem at all. Feel free to browse our website and let me know if you have any other questions!";
        }
        else if (lowerText.match(/(who|name|agent)/)) {
          botReply = "I am the Saverra Realty AI Assistant. I can help you with property details, pricing, and scheduling site visits.";
        }
        else if (lowerText.match(/(where|location|address)/)) {
          botReply = "Our premium properties are located in prime areas of Mumbai (like Ghatkopar East) and Bengaluru. Which city are you interested in?";
        }
        else if (lowerText.match(/(contact|email|phone|call|number)/)) {
          botReply = "You can reach us directly at +91 98765 43210 or email us at contact@saverrarealty.com. Should I arrange a callback for you?";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: botReply,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }, 1000 + Math.random() * 1500); // 1-2.5s realistic typing delay
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[400px] w-[320px] sm:w-[350px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl animate-in slide-in-from-bottom-5 transform origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between bg-[color:var(--navy-deep)] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="grid size-10 place-items-center rounded-full bg-gold/20 text-gold">
                  <Bot className="size-6" />
                </div>
                <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[color:var(--navy-deep)] bg-green-500"></div>
              </div>
              <div>
                <h3 className="font-display font-bold leading-tight">Saverra Agent</h3>
                <p className="text-[10px] text-white/70">Typically replies instantly</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/10 transition-colors">
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border/60 text-foreground rounded-tl-sm shadow-sm"}`}>
                  <p>{msg.text}</p>
                  <p className={`mt-1 text-[9px] ${msg.sender === "user" ? "text-primary-foreground/70 text-right" : "text-muted-foreground"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border/60 text-foreground rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm flex items-center gap-1.5 w-16">
                  <span className="size-1.5 rounded-full bg-foreground/40 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="size-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 bg-card flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button size="icon" onClick={handleSend} className="rounded-full size-10 shrink-0">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex size-14 items-center justify-center rounded-full bg-gold text-[color:var(--navy-deep)] shadow-lg transition-transform hover:scale-110 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <MessageSquare className="size-6 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-background">1</span>
        </button>
      )}
    </div>
  );
}
