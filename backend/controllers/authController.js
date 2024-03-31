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
export const createUser = tryCatchWrapper(async (req, res) => {
  const { name, email, password, role, organizationId } = req.body;

  let existingUser = await User.findOne({ where: { email } });
  let passwordHash = await hashPassword(password);

  if (existingUser) {
    throwError({
      message: "Duplicate email",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  let newUser; // Declare newUser variable outside the if block

  if (role === "organization") {
    // Create the organization record
    let organization = await Organization.create({
      name: name,
    });

    // Create the user record with the provided data and the organizationId
    newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role,
      organizationId: organization.id, // Assign the organizationId to the newly created organization's ID
    });

    // Set the adminUserId of the organization to the ID of the newly created user
    organization.adminUserId = newUser.id;
    await organization.save();
  } else {
    // Create the user record with the provided data
    newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role,
    });
  }

  let infoObj = { userId: newUser.id };
  let token = await generateToken(infoObj, secretKey, expiryIn);
  console.log(existingUser);
  console.log(token);

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
    token: token,
  });
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
export const logoutUser = tryCatchWrapper(async (req, res) => {
  const tokenId = req.token.tokenId;

  // Ensure that the token ID is present
  if (!tokenId) {
    throwError({
      message: "Token ID is missing in the request",
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Destroy the token associated with the token ID
  await Token.destroy({ where: { id: tokenId } });

  // Send success response
  successResponseData({
    res,
    message: "Logout Successful",
    statusCode: HttpStatus.OK,
  });
});
