import { PokemonDetailsView } from "@/components/PokemonDetailsView";
import { Pokemon } from "@/types/pokemon";
import { fireEvent, render } from "@testing-library/react-native";

const pokemon: Pokemon = {
  id: 1,
  name: "bulbasaur",
  image: "https://example.com/front.png",
  imageBack: "https://example.com/back.png",
  types: [{ name: "grass" }, { name: "poison" }],
  height: 7,
  weight: 69,
  abilities: ["overgrow"],
  stats: [{ name: "hp", value: 45 }],
  evolution: ["bulbasaur", "ivysaur", "venusaur"],
  moves: ["tackle", "growl"],
};

test("renders each Pokemon details tab", async () => {
  const { getByRole, getByText } = await render(
    <PokemonDetailsView pokemon={pokemon} />,
  );

  expect(getByText("bulbasaur")).toBeTruthy();
  expect(getByText("About")).toBeTruthy();
  expect(getByText("0.7 m")).toBeTruthy();

  await fireEvent.press(getByRole("tab", { name: "Base Stats" }));

  expect(getByText("45")).toBeTruthy();

  await fireEvent.press(getByRole("tab", { name: "Evolution" }));
  expect(getByText("ivysaur")).toBeTruthy();

  await fireEvent.press(getByRole("tab", { name: "Moves" }));
  expect(getByText("tackle")).toBeTruthy();
});
