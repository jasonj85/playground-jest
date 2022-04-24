import { useState } from "react";
import "./App.css";

export function replaceCamelCaseWithSpaces(str) {
  return str.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  const [disableButton, setDisableButton] = useState(false);

  const handleColorButtonClick = () => {
    setButtonColor(newButtonColor);
  };

  const handleCheckboxChange = (e) => {
    setDisableButton(e.target.checked);
  };

  return (
    <div className="App">
      <button
        style={{
          backgroundColor: disableButton ? "grey" : buttonColor,
          color: "white",
          marginTop: "10px",
          padding: "10px",
          textDecoration: disableButton ? "line-through" : "none",
        }}
        onClick={handleColorButtonClick}
        disabled={disableButton}
      >
        Change to {replaceCamelCaseWithSpaces(newButtonColor)}
      </button>
      <input
        type="checkbox"
        id="disable-button"
        name="disable-button"
        onChange={(e) => handleCheckboxChange(e)}
        defaultChecked={disableButton}
        aria-checked={disableButton}
      />
      <label htmlFor="disable-button">Disable button</label>
    </div>
  );
}

export default App;
