import { useState } from "react";
import "./App.css";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  const handleColorButtonClick = () => {
    setButtonColor(newButtonColor);
  };

  return (
    <div className="App">
      <button
        style={{ backgroundColor: buttonColor, color: "white" }}
        onClick={handleColorButtonClick}
      >
        Change to {newButtonColor}
      </button>
    </div>
  );
}

export default App;
