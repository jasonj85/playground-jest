import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("Options", () => {
  test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

    expect(scoopImages).toHaveLength(3);

    const altText = scoopImages.map((img) => img.getAttribute("alt"));
    expect(altText).toEqual([
      "Chocolate scoop",
      "Vanilla scoop",
      "Salted Caramel scoop",
    ]);
  });

  test("displays image for each topping option from server", async () => {
    render(<Options optionType="toppings" />);

    const images = await screen.findAllByRole("img", { name: /topping$/i });

    expect(images).toHaveLength(3);

    const altText = images.map((img) => img.getAttribute("alt"));
    expect(altText).toEqual([
      "M&Ms topping",
      "Hot Fudge topping",
      "Cherries topping",
    ]);
  });
});
