export interface PokemonType {
  name: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
  height: number;
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
  evolution: string[];
  moves: string[];
}
