import { Router } from "express";
import { isValidToken } from "../middleware/isValidToken.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { formFieldsController } from "../controllers/index.js";
import validation from "../middleware/validation.js";
import formFieldsSchema from "../validation/formFieldsValdation.js";

const formFieldsRouter = Router();

formFieldsRouter
  .route("/")
  .post(
    isValidToken,
    isAuthorized("organization"),
    formFieldsController.createFormFields
  )
  .get(
    isValidToken,
    isAuthorized("organization"),
    formFieldsController.readAllFormFields
  );

formFieldsRouter
  .route("/:id")
  .patch(
    // validation(formFieldsSchema),
    isValidToken,
    isAuthorized("organization"),
    formFieldsController.updateFormFields
  )
  .get(
    isValidToken,
    isAuthorized("organization"),
    formFieldsController.readSpecificFormField
  )
  .delete(
    isValidToken,
    isAuthorized("organization"),
    formFieldsController.deleteFormField
  );

export default formFieldsRouter;
