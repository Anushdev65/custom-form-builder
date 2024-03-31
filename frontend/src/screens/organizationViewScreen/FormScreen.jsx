import React, { useState } from "react";
import {
  CircularProgress,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  useCreateFormMutation,
  useGetAllFormQuery,
  useDeleteFormMutation,
} from "../../apiSlice/form";

// Import form field components
import { CheckboxField } from "../../components/formFields/Checkbox";
import { DropdownField } from "../../components/formFields/DropdownField";
import { DateField } from "../../components/formFields/DateField";
import { NumberField } from "../../components/formFields/NumberField";
import { TextComponent } from "../../components/formFields/TextField";
import { RadioField } from "../../components/formFields/RadioField";
import { getUserInfo } from "../../localStorage/localStorage";
import Navbar from "../../components/navbar/Navbar";

export const FormScreen = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [labelInput, setLabelInput] = useState(""); // State to store label input value
  const [formName, setFormName] = useState(""); // State to store form name input value

  const [createFormMutation] = useCreateFormMutation();
  const [deleteFormMutation] = useDeleteFormMutation();

  const {
    data: allForms,
    isLoading: allFormsLoading,
    error: allFormsError,
    refetch: refetchForms,
  } = useGetAllFormQuery();

  //Fetching the organizationID
  const { user } = getUserInfo();
  const organization = user?.organizationId;

  const handleButtonClick = (fieldType) => {
    // Don't add field if label input is empty
    if (!labelInput) {
      alert("Please enter a label for the field.");
      return;
    }

    setSelectedFields((prevSelectedFields) => [
      ...prevSelectedFields,
      { type: fieldType, label: labelInput, key: prevSelectedFields.length },
    ]);

    setLabelInput("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const payload = {
        name: formName,
        label: selectedFields.map(({ label }) => [label]),
        organizationId: organization,
      };

      // Initializing request payload for creating form
      await createFormMutation(payload);

      // Resets selected fields and form name
      setSelectedFields([]);
      setFormName("");
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteForm = async (formId) => {
    try {
      // Invoke the deleteFormMutation with the formId
      await deleteFormMutation(formId);

      // Refetch forms data after deleting a form
      refetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "2rem",
      }}
    >
      <Navbar />
      <div>
        <Typography variant="h5">Select Form Fields</Typography>
        {selectedFields.length > 0 && (
          <Card variant="outlined" sx={{ my: 2 }}>
            <CardContent>
              {selectedFields.map((field) => {
                switch (field.type) {
                  case FormFieldTypes.Checkbox:
                    return (
                      <CheckboxField key={field.key} label={field.label} />
                    );
                  case FormFieldTypes.Dropdown:
                    return (
                      <DropdownField
                        type="dropdown"
                        options={["Option 1", "Option 2"]}
                      />
                    );
                  case FormFieldTypes.Date:
                    return <DateField key={field.key} label={field.label} />;
                  case FormFieldTypes.Number:
                    return <NumberField key={field.key} label={field.label} />;
                  case FormFieldTypes.Text:
                    return (
                      <TextComponent key={field.key} label={field.label} />
                    );
                  case FormFieldTypes.Radio:
                    return (
                      <RadioField
                        type="radio"
                        options={["Option 1", "Option 2"]}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </CardContent>
          </Card>
        )}

        {/* Input field for form name */}
        <div>
          <Typography variant="h6">Form Name:</Typography>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>

        {/* Render buttons for each form field type with input for label */}
        <div>
          <Typography variant="h6">Add Form Fields:</Typography>
          {Object.values(FormFieldTypes).map((fieldType) => (
            <div key={fieldType} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder={`Enter label for ${fieldType}`}
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleButtonClick(fieldType)}
                disabled={isLoading}
              >
                {fieldType}
              </Button>
            </div>
          ))}
        </div>

        {/* Button to create the form */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Create Form"}
        </Button>
      </div>

      {/* Display all forms */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          marginTop: "20px", // Add margin to separate from the previous section
        }}
      >
        <Typography variant="h5">All Forms</Typography>
        {allFormsLoading ? (
          <CircularProgress />
        ) : allFormsError ? (
          <Typography>Error fetching forms</Typography>
        ) : (
          <div>
            {allForms?.data?.map((form) => (
              <Card key={form.id} variant="outlined" sx={{ width: 300 }}>
                <CardContent>
                  <Typography variant="h6">{form?.name}</Typography>
                  {/* Render other form details here */}
                  <Typography>Labels:</Typography>
                  <ul>
                    {/* Flatten the label array and map over it */}
                    {form?.label.flat().map((label, index) => (
                      <li key={index}>{label}</li>
                    ))}
                  </ul>
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteForm(form?.id)} // Pass form id to the delete function
                >
                  Delete Form
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Define available form field types
const FormFieldTypes = {
  Checkbox: "Checkbox",
  Dropdown: "Dropdown",
  Date: "Date",
  Number: "Number",
  Text: "Text",
  Radio: "Radio",
};
