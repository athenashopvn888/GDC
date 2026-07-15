interface StrainEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
}

const menuNotes = [
  { emoji: "*", label: "Menu Listed" },
  { emoji: "+", label: "Compare Tier" },
  { emoji: "i", label: "Ask Staff" },
];

const tierNames: Record<string, string> = {
  EXOTIC: "Exotic flower",
  PREMIUM: "Premium flower",
  "AAA+": "AAA+ flower",
  AA: "AA flower",
  BUDGET: "Budget flower",
};

export function getStrainData(
  name: string,
  type: "indica" | "sativa" | "hybrid",
  tier: string,
  _thc: string
): StrainEffects {
  void _thc;
  const typeLabel = type === "indica" ? "Indica" : type === "sativa" ? "Sativa" : "Hybrid";
  const tierName = tierNames[tier] || tier;
  return {
    effects: menuNotes,
    description: `${name} is listed in the ${tierName} ${typeLabel} lane at Green Deal Cannabis. Compare the current product page, menu details, weight, and posted price before choosing.`,
    metaDescription: `${name} at Green Deal Cannabis in York. Review the current ${tierName} listing and ask staff when an item detail matters.`,
  };
}
