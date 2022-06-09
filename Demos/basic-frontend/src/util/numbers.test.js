import { it, expect, describe } from "vitest";
import { transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should transform valid number string to a number", () => {
    // arrange
    const value = "74.6";

    // act
    const result = transformToNumber(value);

    // assert
    expect(result).toBe(74.6);
  });

  it("should return number if number is provided", () => {
    const value = 12.5;

    const result = transformToNumber(value);

    expect(result).toBe(12.5);
  });

  it("should return NaN if value provided cannot be converted to a number", () => {
    const value = "abc";

    const result = transformToNumber(value);

    expect(result).toBeNaN();
  });
});
