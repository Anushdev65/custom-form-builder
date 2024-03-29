import { Router } from "express";

import { userRouter } from "./userRouter.js";

const apiRouter = Router();

const OurRoutes = [
  {
    path: `/user`,
    router: userRouter,
  },
];

OurRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
