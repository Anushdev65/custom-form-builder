import React from "react";
import TextField from "@mui/material/TextField";
export const TextComponent = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      size="small"
    />
  );
};
