export interface ItemEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
  consume: string;
}

const menuNotes = [
  { emoji: "*", label: "Menu Listed" },
  { emoji: "+", label: "Compare Details" },
  { emoji: "i", label: "Ask Staff" },
];

export function getItemData(category: string, name: string): ItemEffects {
  const cat = category.toUpperCase();
  const base = {
    effects: menuNotes,
    metaDescription: `Review ${name} menu information at Green Deal Cannabis in York. Check current details before visiting.`,
  };

  if (cat === "EDIBLES") return { ...base, description: `${name} appears in the edibles category at Green Deal Cannabis. Review the current menu and package details before visiting.`, consume: "Review the package and current menu details. Ask staff if an item detail is unclear before choosing." };
  if (cat.includes("VAPE")) return { ...base, description: `${name} appears in a vape category at Green Deal Cannabis. Review the current product format and package details.`, consume: "Review the package for format and compatibility details, and ask staff if an item detail is unclear." };
  if (cat === "CONCENTRATES") return { ...base, description: `${name} appears in the concentrates category at Green Deal Cannabis. Confirm the current product and format details.`, consume: "Review the package and ask staff when a concentrate format detail matters." };
  if (cat === "PREROLLS") return { ...base, description: `${name} appears in the pre-roll category at Green Deal Cannabis. Check the current product name and pack details.`, consume: "Review the package and ask staff if the format or pack detail is unclear." };
  if (cat === "MAGIC & OTHERS") return { ...base, description: `${name} appears in the specialty category at Green Deal Cannabis. Confirm current product and package details before choosing.`, consume: "Review the package and ask staff if an item detail is unclear." };

  return { ...base, description: `${name} appears in the Green Deal Cannabis menu. Confirm current product details before visiting.`, consume: "Review the package and current menu for item details." };
}
