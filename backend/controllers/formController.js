import { HttpStatus } from "../constant/constant.js";
import { Form } from "../models/index.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import successResponseData from "../helper/successResponseData.js";
import { throwError } from "../utils/throwError.js";

// Endpoint function for creating a form
export const createForm = tryCatchWrapper(async (req, res) => {
  const { name, label, organizationId } = req.body;

  const data = await Form.create({ name, label, organizationId });

  successResponseData({
    res,
    message: "Form created successfully",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export const readAllForms = tryCatchWrapper(async (req, res) => {
  // Fetch all forms from the database
  const forms = await Form.findAll();

  // If no forms are found, return an empty array
  if (!forms || forms.length === 0) {
    return successResponseData({
      res,
      message: "No forms found",
      statusCode: HttpStatus.OK,
      data: [],
    });
  }

  successResponseData({
    res,
    message: "All forms read successfully",
    statusCode: HttpStatus.OK,
    data: forms,
  });
});

// Endpoint function to read specific form
export const readSpecificForm = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;

  // Find the form in the database along with its associated form fields
  const form = await Form.findByPk(id, { include: [{ model: FormField }] });

  // If form doesn't exist, return an error
  if (!form) {
    throwError({
      message: "Form not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Send the response with the form data
  successResponseData({
    res,
    message: "Form read successfully",
    data: form.toJSON(),
  });
});

// Endpoint function for updating a form
export const updateForm = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, label, organizationId } = req.body;

  // Find the form in the database
  let form = await Form.findByPk(id);

  // If form doesn't exist, return an error
  if (!form) {
    throwError({
      message: "Form not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Update the form data
  form = await form.update({ name, label, organizationId });

  successResponseData({
    res,
    message: "Form updated successfully",
    statusCode: HttpStatus.OK,
    data: form,
  });
});

// Endpoint function for deleting a form
export const deleteForm = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;

  // Find the form in the database
  const form = await Form.findByPk(id);

  // If form doesn't exist, return an error
  if (!form) {
    throwError({
      message: "Form not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Delete the form
  await form.destroy();

  successResponseData({
    res,
    message: "Form deleted successfully",
    statusCode: HttpStatus.OK,
  });
});
