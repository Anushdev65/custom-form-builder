import {
  expiryIn,
  resetExpiryIn,
  secretKey,
  tokenTypes,
} from "../config/config.js";

import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { Organization, User } from "../models/index.js";

import { Token } from "../models/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";
import { generateToken } from "../utils/token.js";

// export const createUser = tryCatchWrapper(async (req, res) => {
//   const { name, email, password, role, organizationId } = req.body;

//   let existingUser = await User.findOne({ where: { email } });
//   let passwordHash = await hashPassword(password);

//   if (existingUser) {
//     throwError({
//       message: "Duplicate email",
//       statusCode: HttpStatus.UNAUTHORIZED,
//     });
//   } else {
//     //create organization

//     let newUser = await User.create({
//       name,
//       email,
//       password: passwordHash,
//       role,
//       organizationId,
//     });
//     console.log(newUser);
//     let infoObj = { userId: newUser.id };
//     let token = await generateToken(infoObj, secretKey, expiryIn);
//     console.log(existingUser);
//     console.log(token);

//     let tokenData = {
//       token: token,
//       userId: newUser.id,
//       type: tokenTypes.ACCESS,
//       expiration: getTokenExpiryTime(token).toLocaleString(),
//     };

//     await Token.create(tokenData);

//     successResponseData({
//       res,
//       message: "User created successfully",
//       statusCode: HttpStatus.CREATED,
//       tokenData,
//       token,
//     });
//   }
// });

export const createUser = tryCatchWrapper(async (req, res) => {
  const { name, email, password, role, organizationId } = req.body;

  let existingUser = await User.findOne({ where: { email } });
  let passwordHash = await hashPassword(password);

  if (existingUser) {
    throwError({
      message: "Duplicate email",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {
    let newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role,
      organizationId,
    });

    // Check if the role is "organization"
    if (role === "organization") {
      // Create an organization with the adminUserId set to the ID of the newly created user
      let organization = await Organization.create({
        name: name,
        adminUserId: newUser.id, // Set the adminUserId to the ID of the newly created user
      });
    }

    let infoObj = { userId: newUser.id };
    let token = await generateToken(infoObj, secretKey, expiryIn);

    let tokenData = {
      token: token,
      userId: newUser.id,
      type: tokenTypes.ACCESS,
      expiration: getTokenExpiryTime(token).toLocaleString(),
    };

    await Token.create(tokenData);

    successResponseData({
      res,
      message: "User created successfully",
      statusCode: HttpStatus.CREATED,
      tokenData,
      token,
    });
  }
});

export const userLogin = tryCatchWrapper(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await User.findOne({ where: { email } });
  if (user === null) {
    throwError({
      message: "please enter a valid email or password",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {
    let isValidPassword = await comparePassword(password, user.password);
    if (isValidPassword) {
      let infoObj = { userId: user.id };
      let token = await generateToken(infoObj, secretKey, expiryIn);

      console.log(token);

      let data = {
        token: token,
        userId: user.id,
        type: tokenTypes.ACCESS,
        expiration: getTokenExpiryTime(token).toLocaleString(),
      };

      await Token.create(data);

      console.log(data);

      successResponseData({
        res,
        message: "Login Successfully.",
        statusCode: HttpStatus.OK,
        data: {
          token: token,
          user: user,
        },
      });
    } else {
      throwError({
        message: "please enter a valid email or password",
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
});

// export const logoutUser = tryCatchWrapper(async (req, res) => {
//   const tokenId = req.token.tokenId;

//   //Delete the token which is linked with specific user
//   await Token.destroy({ where: { id: tokenId } });

//   successResponseData({
//     res,
//     message: "Logout Successfully.",
//     statusCode: HttpStatus.OK,
//   });
// });
export const logoutUser = tryCatchWrapper(async (req, res) => {
  const tokenId = req.token?.tokenId;

  if (!tokenId) {
    throwError({
      message: "Token ID is missing or invalid",
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Delete the token which is linked with the specific user
  await Token.destroy({ where: { id: tokenId } });

  successResponseData({
    res,
    message: "Logout Successfully.",
    statusCode: HttpStatus.OK,
  });
});
