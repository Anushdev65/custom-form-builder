import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Tooltip,
  CardActions,
} from "@mui/material";
import { FormFieldsList } from "../../components/formFields/FormFieldsList";
import { CheckboxField } from "../../components/formFields/Checkbox";
import { DropdownField } from "../../components/formFields/DropdownField";
import { DateField } from "../../components/formFields/DateField";
import { NumberField } from "../../components/formFields/NumberField";
import { TextComponent } from "../../components/formFields/TextField";
import { RadioField } from "../../components/formFields/RadioField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateFormFieldsMutation } from "../../apiSlice/formFields";
import Navbar from "../../components/navbar/Navbar";
import DateRangeIcon from "@mui/icons-material/DateRange"; // Example for date field
import NumericIcon from "@mui/icons-material/Calculate"; // Assuming this for number field, choose appropriate icons
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"; // For radio buttons
import CheckBoxIcon from "@mui/icons-material/CheckBox"; // For checkboxes

export const FormFieldsScreen = () => {
  // State to manage selected form field types
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [createFormFields, { isLoading }] = useCreateFormFieldsMutation();

  // Function to handle adding a form field type
  const handleAddFieldType = (type) => {
    setSelectedTypes([...selectedTypes, type]);
  };

  // Function to handle removing a form field type
  const handleRemoveFieldType = (type) => {
    const indexToRemove = selectedTypes.findIndex((t) => t === type); // Find the index of the first occurrence of the type
    if (indexToRemove !== -1) {
      // If the type is found
      const updatedTypes = [...selectedTypes]; // Create a copy of selectedTypes array
      updatedTypes.splice(indexToRemove, 1); // Remove the type at the found index
      setSelectedTypes(updatedTypes); // Update the state with the modified array
    }
  };

  //Function for updating the form Fields

  const handleFormCreation = async () => {
    try {
      const payload = {
        type: selectedTypes,
      };
      await createFormFields(payload);
      // Clear selected types after successful form creation
      setSelectedTypes([]);
    } catch (error) {
      console.error("Error creating form fields:", error);
    }
  };

  // Render form field components based on selected types
  const renderFormFields = () => {
    return selectedTypes.map((type, index) => {
      switch (type) {
        case "text":
          return <TextComponent key={index} />;
        case "dropdown":
          return (
            <DropdownField
              key={index}
              label="Dropdown Label"
              options={["Option 1", "Option 2"]}
              onChange={(value) => handleDropdownChange(index, value)}
            />
          );
        case "date":
          return <DateField key={index} />;
        case "number":
          return <NumberField key={index} />;
        case "radio":
          return (
            <RadioField
              key={index}
              options={["Option 1", "Option 2"]}
              onChange={(value) => handleRadioChange(index, value)}
            />
          );
        case "checkbox":
          return <CheckboxField key={index} />;
        default:
          return null;
      }
    });
  };

  // Handler for dropdown field change
  const handleDropdownChange = (index, value) => {
    // Implement logic to handle dropdown field change
  };

  // Handler for radio field change
  const handleRadioChange = (index, value) => {
    // Implement logic to handle radio field change
  };

  const fieldTypes = [
    { title: "Text Field", type: "text", Icon: AddCircleIcon }, // AddCircleIcon used as a placeholder, replace with a specific icon if desired
    { title: "Dropdown", type: "dropdown", Icon: AddCircleIcon }, // Same here
    { title: "Date Field", type: "date", Icon: DateRangeIcon },
    { title: "Number Field", type: "number", Icon: NumericIcon },
    { title: "Radio Button", type: "radio", Icon: RadioButtonCheckedIcon },
    { title: "Checkbox", type: "checkbox", Icon: CheckBoxIcon },
    // Add other field types as needed
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ gap: 2, overflowY: "auto" }}
    >
      <Navbar />
      <Card sx={{ width: 250, height: 500 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Selected Types
          </Typography>
          {selectedTypes.length === 0 ? (
            <Typography variant="body1" align="center">
              No types selected
            </Typography>
          ) : (
            selectedTypes.map((type, index) => (
              <Typography key={index} variant="body1" align="center">
                {type}
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleRemoveFieldType(type)}
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
            ))
          )}
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 300,
          height: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create Form Fields
          </Typography>
          {/* Render form field components */}
          {renderFormFields()}
          {/* Select button to add form field types */}
          <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ gap: 3 }}
          >
            {fieldTypes.map(({ title, type, Icon }) => (
              <Tooltip key={type} title={title}>
                <IconButton
                  color="primary"
                  onClick={() => handleAddFieldType(type)}
                  size="small"
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={handleFormCreation}
            disabled={isLoading || selectedTypes.length === 0}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </CardActions>
      </Card>

      {/* Card for displaying created form fields */}
      <Card sx={{ width: 600, height: 500 }}>
        <FormFieldsList />
      </Card>
    </Box>
  );
};
