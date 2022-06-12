import { extractEnteredNumberValues } from "./src/parser.js";
import { calculateResult } from "./src/math.js";
import { generateResultTest, outputResult } from "./src/output.js";

const form = document.querySelector("form");

function formSubmitHandler(event) {
  event.preventDefault();

  const numberValues = extractEnteredNumberValues(form);
  const result = calculateResult(numberValues);
  const resultText = generateResultTest(result);

  outputResult(resultText);
}

form.addEventListener("submit", formSubmitHandler);
