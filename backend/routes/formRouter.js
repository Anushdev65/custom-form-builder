import { Router } from "express";
import { isValidToken } from "../middleware/isValidToken.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { formController } from "../controllers/index.js";

const formRouter = Router();

formRouter
  .route("/")
  .post(isValidToken, isAuthorized("organization"), formController.createForm)
  .get(isValidToken, isAuthorized("organization"), formController.readAllForms);

formRouter
  .route("/:id")
  .patch(isValidToken, isAuthorized("organization"), formController.updateForm)
  .get(
    isValidToken,
    isAuthorized("organization"),
    formController.readSpecificForm
  )
  .delete(
    isValidToken,
    isAuthorized("organization"),
    formController.deleteForm
  );

export default formRouter;
