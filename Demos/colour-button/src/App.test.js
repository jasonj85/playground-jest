import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial colour", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to blue" });
  expect(button).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to blue" });

  expect(button).toHaveStyle({ backgroundColor: "red" });
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "blue" });
  expect(button.textContent).toBe("Change to red");
});

test("button turns red when clicked", () => {});
