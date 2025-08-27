import React, { useState } from "react";
import Button from "./Button";

export default function ExpressionInput() {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (/^[0-9+\-*/().% ]*$/.test(newValue)) {
            setValue(newValue);
        }
    };

    const handleButtonClick = (btnValue) => {
        if (btnValue === "Backspace") {
            // remove last character
            setValue((prev) => prev.slice(0, -1));
        } else if (btnValue === "=") {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(value);
                setValue(result.toString());
            } catch {
                setValue("Error");
            }
        } else {
            // default: append value
            setValue((prev) => prev + btnValue);
        }
    };


    // ✅ Evaluate expression when Enter is pressed
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(value);
                setValue(result.toString());
            } catch {
                setValue("Error");
            }
        }

    }


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
        <div>
            {/* Example buttons */}
            <Button className="button" label="1" onClick={handleButtonClick} />
            <Button className="button" label="2" onClick={handleButtonClick} />
            <Button className="button" label="3" onClick={handleButtonClick} />
            <Button className="button" label="4" onClick={handleButtonClick} />
            <Button className="button" label="5" onClick={handleButtonClick} />
            <Button className="button" label="6" onClick={handleButtonClick} />
            <Button className="button" label="7" onClick={handleButtonClick} />
            <Button className="button" label="8" onClick={handleButtonClick} />
            <Button className="button" label="9" onClick={handleButtonClick} />
            <Button className="button" label="0" onClick={handleButtonClick} />
            <Button label="AC" onClick={() => {
                const clear = setValue("");
            }} />
            <Button className="button" label="." onClick={handleButtonClick} />
            <Button className="button" label="+" onClick={handleButtonClick} />

            <Button className="button" label="%" onClick={handleButtonClick} />
            <Button className="button" label="-" onClick={handleButtonClick} />
            <Button className="button" label="/" onClick={handleButtonClick} />
            <Button className="button" label="*" onClick={handleButtonClick} />
            <Button className="button" label="Backspace" onClick={handleButtonClick} />
            <Button className="button" label="=" onClick={() => {
                try {
                    // eslint-disable-next-line no-eval
                    const result = eval(value);
                    setValue(result.toString());
                } catch {
                    setValue("Error");
                }
            }} />
        </div>
    </div>

);
};
