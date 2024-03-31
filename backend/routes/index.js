import { Router } from "express";

import authRouter from "./authRouter.js";
import formFieldsRouter from "./formFieldsRouter.js";
import formRouter from "./formRouter.js";

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

  {
    path: `/form`,
    router: formRouter,
  },
];

OurRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
