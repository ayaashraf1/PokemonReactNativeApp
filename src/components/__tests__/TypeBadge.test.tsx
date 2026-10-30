import { TypeBadge } from "@/components/TypeBadge";
import { render } from "@testing-library/react-native";

test("renders a Pokemon type label", async () => {
  const { getByText } = await render(<TypeBadge type="fire" />);

  expect(getByText("fire")).toBeTruthy();
});
