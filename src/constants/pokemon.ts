export const typeColors: Record<string, string> = {
  fire: "#FCA5A5",
  water: "#93C5FD",
  grass: "#86EFAC",
  electric: "#FDE68A",
  ice: "#BAE6FD",
  fighting: "#FDBA74",
  poison: "#D8B4FE",
  ground: "#D6B38A",
  flying: "#BFDBFE",
  psychic: "#F9A8D4",
  bug: "#BEF264",
  rock: "#CBD5E1",
  ghost: "#C4B5FD",
  dragon: "#A5B4FC",
  dark: "#94A3B8",
  steel: "#D1D5DB",
  fairy: "#FBCFE8",
};

export const getTypeColor = (type: string) => typeColors[type] ?? "#E2E8F0";

export const getTypeSurfaceColor = (type: string) => `${getTypeColor(type)}66`;
