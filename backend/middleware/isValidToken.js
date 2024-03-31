import { secretKey } from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import { verifyToken } from "../utils/token.js";
import tryCatchWrapper from "./tryCatchWrapper.js";
import { User } from "../models/index.js";
import { Token } from "../models/index.js";
export const isValidToken = tryCatchWrapper(async (req, res, next) => {
  let { authorization = "" } = req.headers;
  let arr = authorization.split(" ");
  let token = arr[1] || "";

  if (arr[0] === "Bearer" && token) {
    let info = await verifyToken(token, secretKey);
    let user = await User.findOne({ where: { id: info.userId } });

    let tok = await Token.findOne({ where: { token: token } });

    if (!user || !user.role) {
      throwError({
        message: "User not found or role information missing",
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (!tok) {
      let error = new Error("Please enter valid token");
      error.statusCode = HttpStatus.UNAUTHORIZED;
      throw error;
    } else {
      req.token = {
        token: token,
        tokenId: tok.id,
      };
      req.info = {
        ...info,
        roles: user.role,
      };
      next();
    }
  } else {
    let error = new Error("Token is not valid");
    error.statusCode = 401;
    throw error;
  }
});
