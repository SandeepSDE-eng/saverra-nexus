export interface ThemePalette {
  id: string;
  name: string;
  primary: string; // Used for --navy-deep
  accent: string;  // Used for --gold
  description: string;
}

export const THEMES: ThemePalette[] = [
  {
    id: "saverra-signature",
    name: "Saverra Signature",
    primary: "#0A4DA1",
    accent: "#C9A86A",
    description: "Vibrant royal blue perfectly matching the original Saverra logo with luxury gold accents."
  },
  {
    id: "sapphire-gold",
    name: "Sapphire & Gold (Classic)",
    primary: "#0B3E78",
    accent: "#C5A059",
    description: "The classic luxury combination of deep navy and rich gold."
  },
  {
    id: "emerald-champagne",
    name: "Emerald & Champagne",
    primary: "#0F4C3A",
    accent: "#D4C29D",
    description: "A rich, majestic green paired with a subtle champagne accent."
  },
  {
    id: "onyx-bronze",
    name: "Onyx & Bronze",
    primary: "#1A1A1A",
    accent: "#CD7F32",
    description: "Ultra-modern, bold black aesthetics with metallic bronze highlights."
  },
  {
    id: "ruby-silver",
    name: "Royal Ruby & Silver",
    primary: "#5E1914",
    accent: "#C0C0C0",
    description: "A commanding deep crimson red with sleek silver touches."
  },
  {
    id: "platinum-obsidian",
    name: "Platinum & Obsidian",
    primary: "#2C3E50",
    accent: "#E5E4E2",
    description: "A sleek, contemporary slate blue with cool platinum accents."
  }
];
