import { getTypeColor } from "@/constants/pokemon";
import { StyleSheet, Text, View } from "react-native";

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
      <Text style={styles.label}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  label: {
    color: "#172033",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
