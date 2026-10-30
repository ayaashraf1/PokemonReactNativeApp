import { StyleSheet, TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      accessibilityLabel="Search Pokemon"
      placeholder="Search Pokemon"
      placeholderTextColor="#94A3B8"
      returnKeyType="search"
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 16,
    borderWidth: 1,
    color: "#172033",
    fontSize: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
});
