import { TypeBadge } from "@/components/TypeBadge";
import { getTypeSurfaceColor } from "@/constants/pokemon";
import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface PokemonDetailsViewProps {
  pokemon: Pokemon;
}

export function PokemonDetailsView({ pokemon }: PokemonDetailsViewProps) {
  const primaryType = pokemon.types[0]?.name ?? "normal";
  const [activeTab, setActiveTab] = useState<
    "about" | "stats" | "evolution" | "moves"
  >("about");

  return (
    <View>
      <View
        style={[
          styles.hero,
          { backgroundColor: getTypeSurfaceColor(primaryType) },
        ]}
      >
        <Text style={styles.number}>
          #{String(pokemon.id).padStart(3, "0")}
        </Text>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </View>
        <View style={styles.images}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
      </View>
      <View style={styles.tabs}>
        {(["about", "stats", "evolution", "moves"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Pressable
              key={tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.activeTabLabel]}
              >
                {tab === "about"
                  ? "About"
                  : tab === "stats"
                    ? "Base Stats"
                    : tab === "evolution"
                      ? "Evolution"
                      : "Moves"}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {activeTab === "about" ? (
        <View style={styles.section}>
          <View style={styles.aboutRow}>
            {[
              { label: "Height", value: `${pokemon.height / 10} m` },
              { label: "Weight", value: `${pokemon.weight / 10} kg` },
            ].map((item) => (
              <View key={item.label} style={styles.detailItem}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.label}>Abilities</Text>
          <Text style={styles.value}>{pokemon.abilities.join(", ")}</Text>
        </View>
      ) : activeTab === "stats" ? (
        <View style={styles.section}>
          {pokemon.stats.map((stat) => (
            <View key={stat.name} style={styles.statRow}>
              <Text style={styles.statName}>{stat.name.replace("-", " ")}</Text>
              <View style={styles.track}>
                <View
                  style={[
                    styles.progress,
                    { width: `${Math.min(stat.value, 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      ) : activeTab === "evolution" ? (
        <View style={styles.section}>
          <View style={styles.evolutionList}>
            {pokemon.evolution.map((stage, index) => (
              <View key={stage} style={styles.evolutionStage}>
                <Text style={styles.evolutionName}>{stage}</Text>
                {index < pokemon.evolution.length - 1 ? (
                  <Text style={styles.evolutionArrow}>›</Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <View style={styles.moves}>
            {pokemon.moves.map((move) => (
              <View key={move} style={styles.move}>
                <Text style={styles.moveName}>{move.replaceAll("-", " ")}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    borderRadius: 28,
    padding: 24,
  },
  number: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "700",
  },
  name: {
    color: "#172033",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 4,
    textTransform: "capitalize",
  },
  types: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  images: {
    marginTop: 12,
  },
  image: {
    height: 240,
    width: 240,
  },
  tabs: {
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 16,
  },
  tab: {
    alignItems: "center",
    flex: 1,
    paddingBottom: 13,
    paddingTop: 9,
  },
  activeTab: {
    borderBottomColor: "#EF5350",
    borderBottomWidth: 3,
  },
  tabLabel: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
  },
  activeTabLabel: {
    color: "#172033",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 16,
    padding: 20,
  },
  aboutRow: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 18,
  },
  detailItem: {
    minWidth: 80,
  },
  label: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    color: "#334155",
    fontSize: 16,
    marginTop: 6,
    textTransform: "capitalize",
  },
  statRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  statName: {
    color: "#64748B",
    fontSize: 12,
    textTransform: "capitalize",
    width: 80,
  },
  track: {
    backgroundColor: "#E2E8F0",
    borderRadius: 99,
    flex: 1,
    height: 8,
    overflow: "hidden",
  },
  progress: {
    backgroundColor: "#EF5350",
    borderRadius: 99,
    height: "100%",
  },
  statValue: {
    color: "#172033",
    fontSize: 12,
    fontWeight: "800",
    width: 28,
  },
  evolutionList: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  evolutionStage: {
    alignItems: "center",
    flexDirection: "row",
  },
  evolutionName: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  evolutionArrow: {
    color: "#EF5350",
    fontSize: 28,
    marginHorizontal: 10,
  },
  moves: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  move: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  moveName: {
    color: "#475569",
    fontSize: 13,
    textTransform: "capitalize",
  },
});
