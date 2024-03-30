import React from "react";
import { TextField } from "@mui/material";

export const NumberField = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      size="small"
    />
  );
};
