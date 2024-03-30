import React from "react";
import { TextField } from "@mui/material";

export const DateField = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      size="small"
    />
  );
};
