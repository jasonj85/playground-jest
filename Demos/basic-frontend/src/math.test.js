import { it, expect, describe } from "vitest";
import { add } from "./math";

describe("add()", () => {
  it("should summarize all number values in an array", () => {
    // arrange
    const numbers = [1, 2, 3, 4, 5];

    // act
    const result = add(numbers);

    // assert
    expect(result).toBe(15);
  });

  it("should be NaN if an invalid number is provided", () => {
    const numbers = [1, 2, 3, "a"];

    const result = add(numbers);

    expect(result).toBeNaN();
  });

  it("should also work with string numbers", () => {
    const numbers = [1, "2", 3, "4"];

    const result = add(numbers);

    expect(result).toBe(10);
  });

  it("should be 0 if an empty array is provided", () => {
    const numbers = [];

    const result = add(numbers);

    expect(result).toBe(0);
  });

  it("should throw an error if no value is passed into function", () => {
    const resultFn = () => add();

    expect(resultFn).toThrow(/is not iterable/);
  });

  it("should throw an error if a non-array value is passed into function", () => {
    const num1 = 1;
    const num2 = 2;

    const resultFn = () => add(num1, num2);

    expect(resultFn).toThrow(/is not iterable/);
  });
});
