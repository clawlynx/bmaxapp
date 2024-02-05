import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("unable to access");
  try {
    const { userId } = verifyJWT(token);
    req.user = await User.findById(userId);
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("invalid authorization");
  }
};

export const checkForAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new UnauthorizedError("Not Authorized. Admins Only");
  }
};

export const checkForTeacher = async (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    throw new UnauthorizedError("Not Authorised. Teachers Only");
  }
};
