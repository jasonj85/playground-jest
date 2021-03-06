import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

describe("Total Updates", () => {
  test("Scoop subtotal updates when scoops change", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    const scoopsSubtotal = screen.getByText(/scoops total: £/i);
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });
});
