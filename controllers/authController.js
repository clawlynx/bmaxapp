import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordutils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const RegisterUser = async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    age,
    branch,
    course,
    isTeacher,
    password,
  } = req.body;

  const isFirst = (await User.countDocuments()) === 0;
  const newRole = isFirst ? "admin" : isTeacher ? "teacher" : "student";
  const teacher = isTeacher
    ? { hasVerified: false, currentStudents: [], totalStudents: [] }
    : null;
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    name,
    email,
    phone,
    address,
    age,
    branch,
    password: hashedPassword,
    course,
    role: newRole,
    teacherDetails: teacher,
  });
  await newUser.save();
  const token = createJWT({ userId: newUser._id, role: newUser.role });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(201).json({ msg: "registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  const token = createJWT({ userId: user._id, role: user.role });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "loggedin successfully" });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "successfully logged out" });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError("no user found");
  res.status(200).json(user);
};
