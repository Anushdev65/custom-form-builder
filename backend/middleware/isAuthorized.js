import tryCatchWrapper from "./tryCatchWrapper.js";

export const isAuthorized = (requiredRole) =>
  tryCatchWrapper(async (req, res, next) => {
    const { roles } = req.info;

    if (roles === requiredRole) {
      next();
    } else {
      const error = new Error("User is not authorized.");
      error.statusCode = 403;
      throw error;
    }
  });
