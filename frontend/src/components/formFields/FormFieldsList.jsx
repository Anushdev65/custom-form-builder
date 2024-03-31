import React from "react";
import {
  useGetAllFormFieldsQuery,
  useUpdateFormFieldsMutation,
  useDeleteFormFieldMutation,
} from "../../apiSlice/formFields";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditFieldModal } from "./EditFieldModal";
import { useState } from "react";
export const FormFieldsList = () => {
  // Fetch form fields data
  const { data, isLoading, error } = useGetAllFormFieldsQuery();

  const [updateFormFields] = useUpdateFormFieldsMutation();
  const [deleteFormField] = useDeleteFormFieldMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const handleEdit = async (id) => {
    try {
      // Fetch the form field details by id
      console.log("Data:", data);
      const fieldToUpdate = data?.data?.find((field) => field?.id === id);
      console.log("Field to update:", fieldToUpdate);
      if (!fieldToUpdate) {
        console.error(`Form field with id ${id} not found`);
        return;
      }

      // Open the modal with the selected field data
      setSelectedField(fieldToUpdate);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error editing form field:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFormField(id);
      // Implement logic to remove deleted form field from the list
      console.log(`Delete ${id}`);
    } catch (error) {
      console.error("Error deleting form field:", error);
    }
  };

  const handleCloseModal = () => {
    // Close the modal and reset selected field
    setIsModalOpen(false);
    setSelectedField(null);
  };

  const handleUpdateField = async (updatedData) => {
    try {
      // Ensure that `type` is always an array
      if (!Array.isArray(updatedData.type)) {
        updatedData.type = [updatedData.type];
      }

      // Update the field with the new data
      await updateFormFields({ id: selectedField?.id, body: updatedData });
      // Close the modal
      handleCloseModal();
      // Optional: Refetch form fields data to update the table
      // refetch();
    } catch (error) {
      console.error("Error updating form field:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" align="center">
          Error: {error?.message}
        </Typography>
      ) : data && data?.data ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((field) => (
                  <TableRow
                    key={field.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {typeof field?.type === "string"
                        ? field?.type.split(",").map((type, index) => (
                            <span key={index} style={{ marginRight: "10px" }}>
                              {type.trim()}
                            </span>
                          ))
                        : field.type.toString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEdit(field?.id)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(field?.id)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedField && (
            <EditFieldModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              field={selectedField}
              onUpdateField={handleUpdateField}
            />
          )}
        </>
      ) : null}
    </div>
  );
};
