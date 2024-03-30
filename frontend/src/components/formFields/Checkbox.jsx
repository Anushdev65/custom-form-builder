import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

export const CheckboxField = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};
