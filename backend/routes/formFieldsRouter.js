import { Router } from "express";
import { isValidToken } from "../middleware/isValidToken.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { formFieldsController } from "../controllers/index.js";

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
