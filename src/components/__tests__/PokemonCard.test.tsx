import { PokemonCard } from "@/components/PokemonCard";
import { Pokemon } from "@/types/pokemon";
import { fireEvent, render } from "@testing-library/react-native";

const pokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  image: "https://example.com/front.png",
  imageBack: "https://example.com/back.png",
  types: [{ name: "electric" }],
  height: 4,
  weight: 60,
  abilities: ["static"],
  stats: [],
  evolution: ["pikachu"],
  moves: ["thunder-shock"],
};

test("renders Pokemon information and handles presses", async () => {
  const onPress = jest.fn();
  const { getByText, getByRole } = await render(
    <PokemonCard pokemon={pokemon} onPress={onPress} />,
  );

  expect(getByText("pikachu")).toBeTruthy();
  expect(getByText("electric")).toBeTruthy();

  fireEvent.press(getByRole("button"));
  expect(onPress).toHaveBeenCalledTimes(1);
});
