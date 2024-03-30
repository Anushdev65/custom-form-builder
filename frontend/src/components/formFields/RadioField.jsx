import React, { useState } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

export const RadioField = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <RadioGroup value={selectedOption} onChange={handleRadioChange}>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio />}
          label={option}
        />
      ))}
    </RadioGroup>
  );
};
