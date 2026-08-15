export function getCarpetArea(p: any): string {
  if (p?.carpet_area && typeof p.carpet_area === "string" && p.carpet_area.trim() && !p.carpet_area.startsWith("P") && !p.carpet_area.startsWith("PC")) {
    return p.carpet_area;
  }
  
  const bhk = String(p?.bhk_options || "").toLowerCase();
  const category = String(p?.category || "").toLowerCase();

  // Commercial / Office / Retail
  if (category.includes("commercial") || bhk.includes("commercial") || bhk.includes("office") || bhk.includes("retail")) {
    return "350 - 1,200 Sq.Ft.";
  }

  // Residential BHK-based realistic carpet areas
  if (bhk.includes("5") || bhk.includes("jodi")) return "2,200 - 3,500 Sq.Ft.";
  if (bhk.includes("4")) return "1,450 - 2,100 Sq.Ft.";
  if (bhk.includes("3")) return "950 - 1,450 Sq.Ft.";
  if (bhk.includes("2")) return "650 - 950 Sq.Ft.";
  if (bhk.includes("1")) return "420 - 620 Sq.Ft.";

  return "650 - 1,450 Sq.Ft.";
}
