import React, { useState } from "react";
import Button from "./Button";

export default function ExpressionInput() {
  const [value, setValue] = useState("");
  const [lastEvaluated, setLastEvaluated] = useState(false); // track if '=' or Enter was just pressed

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^[0-9+\-*/().% ]*$/.test(newValue)) {
      setValue(newValue);
      setLastEvaluated(false); // reset flag on manual input
    }
  };

  const evaluateExpression = () => {

    // 🛑 If already showing Error → clear everything
    if (value === "Error") {
      setValue("");
      setLastEvaluated(false);
      return;
    }

    if (lastEvaluated || value.trim() === "") {
      setValue("");
      setLastEvaluated(false);
      return;
    }

    try {
      // eslint-disable-next-line no-eval
      const result = eval(value);
      setValue(result.toString());
    } catch (error) {
      setValue("Error");
    }

    setLastEvaluated(true);
  };

  const operators = ["+", "-", "*", "/", "%"];

  const handleButtonClick = (btnValue) => {
    const lastChar = value.slice(-1);

    if (btnValue === "Backspace") {
      setValue((prev) => prev.slice(0, -1));
      setLastEvaluated(false);
    }
    else if (btnValue === "=") {
      evaluateExpression();
    }
    else if (btnValue === "AC") {
      setValue("");
      setLastEvaluated(false);
    }
    // 🚫 Prevent consecutive operators
    else if (operators.includes(btnValue)) {
      if (value === "" || operators.includes(lastChar)) {
        return;
      }
      setValue((prev) => prev + btnValue);
    }
    // 🚫 Allow '.' only once in entire expression
    else if (btnValue === ".") {
      if (value.includes(".")) {
        return; // ignore if already used once
      }
      setValue((prev) => prev + ".");
    }
    else {
      if (value === "Error") {
        setValue(btnValue);
      } else {
        setValue((prev) => prev + btnValue);
      }
    }

    setLastEvaluated(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      evaluateExpression();
    } else {
      setLastEvaluated(false);
    }
  };

  return (
    <div className="Main-Box">
      <input
        className="Input-Box"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter math expression"
      />

      <div className="button-box">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "*", "/", "%", "=", "Backspace"].map(
          (label) => (
            <Button
              key={label}
              className="button"
              label={label}
              onClick={handleButtonClick}
            />
          )
        )}
        <Button label="AC" onClick={() => handleButtonClick("AC")} />
      </div>
    </div>
  );
}
