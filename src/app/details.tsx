import { PokemonDetailsView } from "@/components/PokemonDetailsView";
import { Pokemon } from "@/types/pokemon";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function Details() {
  const params = useLocalSearchParams<{ pokemon?: string | string[] }>();
  const rawPokemon = Array.isArray(params.pokemon)
    ? params.pokemon[0]
    : params.pokemon;
  const pokemon = rawPokemon ? (JSON.parse(rawPokemon) as Pokemon) : null;

  return (
    <>
      <Stack.Screen
        options={{
          title: pokemon?.name ?? "Details",
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {pokemon ? <PokemonDetailsView pokemon={pokemon} /> : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
});
