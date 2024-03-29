import { Router } from "express";
import { isValidToken } from "../middleware/isValidToken.js";
import validation from "../middleware/validation.js";
import { userController } from "../controllers/index.js";
import registerSchema from "../validation/registerUserValidation.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import loginSchema from "../validation/userLoginValidation.js";
import logoutSchema from "../validation/logoutValidation.js";

export const userRouter = Router();

userRouter
  .route("/register")
  .post(validation(registerSchema), userController.createUser);

userRouter
  .route("/login")
  .post(validation(loginSchema), userController.userLogin);

userRouter
  .route("/logout")
  .patch(validation(logoutSchema), isValidToken, userController.logoutUser);
