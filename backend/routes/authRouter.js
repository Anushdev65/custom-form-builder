import { Router } from "express";
import { isValidToken } from "../middleware/isValidToken.js";
import validation from "../middleware/validation.js";
import { authController } from "../controllers/index.js";
import registerSchema from "../validation/registerUserValidation.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import loginSchema from "../validation/userLoginValidation.js";
import logoutSchema from "../validation/logoutValidation.js";

export const authRouter = Router();

authRouter
  .route("/register")
  .post(validation(registerSchema), authController.createUser);

authRouter
  .route("/login")
  .post(validation(loginSchema), authController.userLogin);

authRouter
  .route("/logout")
  .patch(validation(logoutSchema), isValidToken, authController.logoutUser);
