import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  showContactActions?: boolean;
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
          text: "Welcome to Saverra Realty! 👋 How can I help you?",
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
    // Using advanced offline rule-based AI since the Gemini API key provided is invalid.
    setTimeout(() => {
      setIsTyping(false);
      const lowerText = userMessage.text.toLowerCase();
      let botReply = "I specialize exclusively in Saverra Realty's premium properties. To give you the exact details you need, could you share your 10-digit mobile number? Our senior property consultant will call you right away.";
      
      if (lowerText.match(/\b(hi|hello|hey|namaste|good morning|good evening|hii)\b/)) {
        botReply = "Hello there! I am your AI assistant at Saverra Realty. Are you looking to buy a new property, or just exploring our premium portfolio?";
      } 
      else if (userMessage.text.match(/\b\d{10}\b/)) {
        botReply = "Thanks for providing your number! Our senior consultant will call you within 5 minutes to discuss your requirements. Is there any specific project you are interested in?";
      } 
      else if (lowerText.includes("ghatkopar")) {
        botReply = "Ghatkopar East is a prime location! We have highly sought-after premium projects there, like 'f Residences' and 'MICL Aaradhya'. Are you looking for a 2BHK or a 3BHK?";
      }
      else if (lowerText.includes("bengaluru") || lowerText.includes("bangalore")) {
        botReply = "We have magnificent ultra-luxury villas and apartments in Bengaluru. What specific area or budget are you targeting?";
      }
      else if (lowerText.match(/(price|cost|budget|crore|lakh|cr)/)) {
        botReply = "Our premium properties typically range from ₹1.5 Cr to over ₹15 Cr. For example, 'Saverra Infinity' in BKC starts at ₹15.5 Cr. What is your preferred budget?";
      }
      else if (lowerText.match(/(bhk|bedroom|flat|apartment|villa|house|home|premium|demo)/)) {
        botReply = "We offer ultra-luxurious 2BHK, 3BHK, and 4+ BHK residences. For a premium demo, I highly recommend checking out 'Saverra Infinity' in BKC or 'MICL Aaradhya'. Would you like to schedule a site visit?";
      }
      else if (lowerText.match(/(amenities|pool|gym|club|parking|garden)/)) {
        botReply = "All our premium properties feature world-class amenities including infinity pools, state-of-the-art gymnasiums, smart home tech, and multi-tier security. Would you like to schedule a site visit to experience it?";
      }
      else if (lowerText.match(/(visit|see|schedule|tour|book)/)) {
        botReply = "I'd be happy to arrange a VIP site visit for you. Please drop your 10-digit mobile number here, and our team will coordinate a convenient time.";
      }
      else if (lowerText.match(/(brochure|pdf|details|download|info|detail)/)) {
        botReply = "You can download the brochure directly from the project section above. If you'd like me to WhatsApp the detailed floor plans to you, just share your 10-digit mobile number!";
      }
      else if (lowerText.match(/(who|name|consultant)/)) {
        botReply = "I am an AI assistant here at Saverra Realty. Our expert advisors are just a call away!";
      }
      else if (lowerText.match(/(where|location|address)/)) {
        botReply = "Our premium properties are located in prime areas of Mumbai (like Ghatkopar East and BKC) and Bengaluru. Which city are you interested in?";
      }
      else if (lowerText.match(/(contact|email|phone|call|number)/)) {
        botReply = "You can reach us directly at +91 98765 43210 or email us at contact@saverrarealty.com. Should I arrange a callback for you?";
      }
      else if (lowerText.match(/\b(yes|yeah|yep|sure|ok|when|how|why|kya|q)\b/)) {
        botReply = "I understand! Since I am an AI, the best way to get exact details is to connect with our human experts. Could you share your 10-digit mobile number so they can assist you properly?";
      }
      else if (lowerText.match(/\b(no|nope|not now)\b/)) {
        botReply = "No problem at all. Feel free to browse our website and let me know if you have any other questions!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          sender: "bot",
          timestamp: new Date(),
          showContactActions: botReply.toLowerCase().includes("call") || botReply.toLowerCase().includes("number") || botReply.toLowerCase().includes("contact")
        },
      ]);
    }, 1000 + Math.random() * 1500); // 1-2.5s realistic typing delay
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[350px] w-[280px] sm:w-[320px] flex-col overflow-hidden rounded-3xl border border-border/40 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-5 transform origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[color:var(--navy-deep)] to-primary p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative shadow-md rounded-full">
                <div className="grid size-10 place-items-center rounded-full bg-gold/20 text-gold">
                  <Bot className="size-6" />
                </div>
                <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[color:var(--navy-deep)] bg-green-500"></div>
              </div>
              <div>
                <h3 className="font-display font-bold leading-tight">Saverra Realty</h3>
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
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.sender === "user" ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-tr-sm" : "bg-card border border-border/40 text-foreground rounded-tl-sm"}`}>
                  <p>{msg.text}</p>
                  
                  {msg.showContactActions && msg.sender === "bot" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href="tel:+919876543210" className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-[color:var(--navy-deep)] border border-gold/30">
                        <Phone className="size-3" /> Call Now
                      </a>
                      <a href="mailto:info@saverra.com" className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted border border-border/50">
                        <Mail className="size-3" /> Email
                      </a>
                    </div>
                  )}

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
          className="group relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-gold to-yellow-400 text-[color:var(--navy-deep)] shadow-lg transition-transform hover:scale-110 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <MessageSquare className="size-6 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-background">1</span>
        </button>
      )}
    </div>
  );
}
