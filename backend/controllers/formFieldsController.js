import { HttpStatus } from "../constant/constant.js";
import { FormFields } from "../models/index.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import successResponseData from "../helper/successResponseData.js";
import { throwError } from "../utils/throwError.js";

// Endpoint function for creating the form fields
export const createFormFields = tryCatchWrapper(async (req, res) => {
  const { type, formId } = req.body;

  const data = await FormFields.create({ type, formId });

  successResponseData({
    res,
    message: "Form fields are created successfully",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

// Endpoint function to read all form fields
export const readAllFormFields = tryCatchWrapper(async (req, res) => {
  // Fetch all form fields from the database
  const formFields = await FormFields.findAll();

  // If no form fields are found, return an empty array
  if (!formFields || formFields.length === 0) {
    return successResponseData({
      res,
      message: "No form fields found",
      statusCode: HttpStatus.OK,
      data: [],
    });
  }

  // If form fields are found, return them in the response
  successResponseData({
    res,
    message: "All form fields read successfully",
    statusCode: HttpStatus.OK,
    data: formFields,
  });
});

// Endpoint function to read specific form field
export const readSpecificFormField = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  // Method of finding the particular form field in the database
  const formField = await FormFields.findByPk(id);

  // If form field doesn't exist it will return an error.
  if (!formField) {
    throwError({
      message: "Form field not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Send the response with the formField data
  successResponseData({
    res,
    message: "Form field read successfully",
    data: formField.toJSON(), // Convert formField to plain JSON object
  });
});
// Endpoint function for updating the form fields
export const updateFormFields = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const { type, formId } = req.body;

  // Find the form field in the database
  let formFieldId = await FormFields.findByPk(id);

  if (!formFieldId) {
    throwError({
      message: "Form field not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  formFieldId = await FormFields.update({ type, formId }, { where: { id } });

  successResponseData({
    res,
    message: "Form fields updated successfully",
    statusCode: HttpStatus.CREATED,
    formFieldId,
  });
});

// Endpoint function for deletation of the created form field
export const deleteFormField = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;

  let formFieldId = await FormFields.findByPk(id);

  if (!formFieldId) {
    throwError({
      message: "Form field not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  await formFieldId.destroy();

  successResponseData({
    res,
    message: "Form fields deleted successfully",
    statusCode: HttpStatus.CREATED,
  });
});
