import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelCaseWithSpaces } from "./App";

const red = "MediumVioletRed";
const blue = "MidnightBlue";

test("initial conditions of app are correct", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("button has correct initial colour", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(button).toHaveStyle({ backgroundColor: red });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(button).toHaveStyle({ backgroundColor: red });
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: blue });
  expect(button).toHaveTextContent("Change to Medium Violet Red");
});

test("button is disabled when the checkbox is checked and not disabled when checkbox is unchecked", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("button is grey when disabled", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "grey" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("TrueBlue")).toBe("True Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("MediumWildGreen")).toBe(
      "Medium Wild Green"
    );
  });
});
