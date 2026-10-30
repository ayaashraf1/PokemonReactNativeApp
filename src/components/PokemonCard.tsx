import { TypeBadge } from "@/components/TypeBadge";
import { getTypeSurfaceColor } from "@/constants/pokemon";
import { Pokemon } from "@/types/pokemon";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.name ?? "normal";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${pokemon.name}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.86 : 1 }]}
    >
      <View
        style={[
          styles.artwork,
          { backgroundColor: getTypeSurfaceColor(primaryType) },
        ]}
      >
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.number}>
          #{String(pokemon.id).padStart(3, "0")}
        </Text>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    flex: 1,
    overflow: "hidden",
  },
  artwork: {
    alignItems: "center",
    height: 170,
    justifyContent: "center",
  },
  image: {
    height: 160,
    width: 160,
  },
  content: {
    padding: 16,
  },
  number: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
  },
  name: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
    textTransform: "capitalize",
  },
  types: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
});
