import { SearchBar } from "@/components/SearchBar";
import { fireEvent, render } from "@testing-library/react-native";

test("reports search text changes", async () => {
  const onChangeText = jest.fn();
  const { getByLabelText } = await render(
    <SearchBar value="" onChangeText={onChangeText} />,
  );

  fireEvent.changeText(getByLabelText("Search Pokemon"), "pikachu");

  expect(onChangeText).toHaveBeenCalledWith("pikachu");
});
