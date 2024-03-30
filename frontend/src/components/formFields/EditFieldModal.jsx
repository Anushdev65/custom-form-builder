import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export const EditFieldModal = ({ isOpen, onClose, field, onUpdateField }) => {
  const [updatedData, setUpdatedData] = useState(field);
  if (!field) {
    return null; // or return a placeholder message, or loading indicator
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdateField(updatedData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Field</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Type"
          name="type"
          value={updatedData.type}
          onChange={handleChange}
        />
        {/* Add more text fields for other properties */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
