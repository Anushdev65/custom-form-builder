import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const DropdownField = ({ label, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth margin="normal" size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={selectedValue} onChange={handleDropdownChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
