import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  test("Initial confitions of Form", () => {
    render(<SummaryForm />);

    const termsAndConditions = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    expect(termsAndConditions).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test("Checkbox enables button on 1st click and disables on 2nd click", () => {
    render(<SummaryForm />);

    const termsAndConditions = screen.getByRole("checkbox", {
      name: /terms and Conditions/i,
    });

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    userEvent.click(termsAndConditions);

    expect(termsAndConditions).toBeChecked();
    expect(confirmButton).toBeEnabled();

    userEvent.click(termsAndConditions);

    expect(termsAndConditions).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test("Popover responds to hover event", async () => {
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and Conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
