import { Router } from "express";

import { authRouter } from "./authRouter.js";
import formFieldsRouter from "./formFieldsRouter.js";

const apiRouter = Router();

const OurRoutes = [
  {
    path: `/auths`,
    router: authRouter,
  },

  {
    path: `/form-fields`,
    router: formFieldsRouter,
  },
];

OurRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
