import { PokemonCard } from "@/components/PokemonCard";
import { SearchBar } from "@/components/SearchBar";
import { fetchPokemons } from "@/services/pokemonApi";
import { Pokemon } from "@/types/pokemon";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchPokemons()
      .then((data) => {
        if (active) setPokemons(data);
      })
      .catch(() => {
        if (active) setError("Unable to load Pokemon right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const normalizedQuery = query.trim().toLowerCase();
    return (
      pokemon.name.includes(normalizedQuery) ||
      pokemon.types.some((type) => type.name.includes(normalizedQuery))
    );
  });

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        data={filteredPokemons}
        keyExtractor={(pokemon) => String(pokemon.id)}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: { pokemon: JSON.stringify(item) },
              })
            }
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>POKEDEX</Text>
            <Text style={styles.title}>Explore Pokemon</Text>
            <Text style={styles.subtitle}>Find your next favorite.</Text>
            <SearchBar value={query} onChangeText={setQuery} />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              color="#EF5350"
              size="large"
              style={styles.state}
            />
          ) : (
            <Text style={styles.state}>{error ?? "No Pokemon found."}</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  list: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    gap: 8,
    marginBottom: 20,
  },
  eyebrow: {
    color: "#EF5350",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    color: "#172033",
    fontSize: 34,
    fontWeight: "900",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    gap: 14,
    marginBottom: 14,
  },
  state: {
    color: "#64748B",
    paddingVertical: 36,
    textAlign: "center",
  },
});
