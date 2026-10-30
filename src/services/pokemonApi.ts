import { Pokemon } from "@/types/pokemon";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon";

interface PokemonListItem {
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

interface EvolutionNode {
  species: { name: string };
  evolves_to: EvolutionNode[];
}

const getImage = (pokemon: any, side: "front_default" | "back_default") =>
  pokemon.sprites.other?.["official-artwork"]?.[side] ?? pokemon.sprites[side];

const getEvolutionNames = (node: EvolutionNode): string[] => [
  node.species.name,
  ...node.evolves_to.flatMap(getEvolutionNames),
];

const mapPokemon = async (pokemon: any): Promise<Pokemon> => {
  const species = await fetchJson(pokemon.species.url);
  const evolutionChain = await fetchJson(species.evolution_chain.url);

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: getImage(pokemon, "front_default"),
    imageBack: getImage(pokemon, "back_default"),
    types: pokemon.types.map((item: any) => ({ name: item.type.name })),
    height: pokemon.height,
    weight: pokemon.weight,
    abilities: pokemon.abilities.map((item: any) => item.ability.name),
    stats: pokemon.stats.map((item: any) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
    evolution: getEvolutionNames(evolutionChain.chain),
    moves: pokemon.moves.map((item: any) => item.move.name),
  };
};

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Pokemon API request failed: ${response.status}`);
  }
  return response.json();
};

export const fetchPokemons = async (limit = 20): Promise<Pokemon[]> => {
  const data = (await fetchJson(
    `${POKE_API_URL}?limit=${limit}`,
  )) as PokemonListResponse;
  return Promise.all(
    data.results.map(async (pokemon) =>
      mapPokemon(await fetchJson(pokemon.url)),
    ),
  );
};
