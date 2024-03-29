import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import Announcement from "../models/Announcement.js";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordutils.js";
import { createJWT } from "../utils/tokenUtils.js";

//registering a new user
export const RegisterUser = async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    age,
    branch,
    department,
    course,
    isTeacher,
    password,
  } = req.body;

  const isFirst = (await User.countDocuments()) === 0;
  const newRole = isFirst ? "admin" : isTeacher ? "teacher" : "student";
  const main = isFirst ? true : false;
  const teacher = isTeacher
    ? {
        hasVerified: false,
        currentStudents: [],
        totalStudents: [],
        completedStudents: [],
      }
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
    department,
    course,
    role: newRole,
    teacherDetails: teacher,
    mainAdmin: main,
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

//logging in user
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

//logging out user
export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "successfully logged out" });
};

//get userinfo (self)
export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError("no user found");
  res.status(200).json(user);
};

//update userprofile(self)
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError("no user found");
  if (user.name !== req.body.name) {
    await User.updateMany(
      { "studentDetails.teacher": user.name },
      { "studentDetails.teacher": req.body.name }
    );
  }
  user.name = req.body.name;
  user.email = req.body.email;
  user.address = req.body.address;
  user.phone = req.body.phone;
  user.age = req.body.age;
  if (req.body.password !== "") {
    user.password = await hashPassword(req.body.password);
  }
  await user.save();
  res.status(200).json(user);
};

//get list of all announcements
export const getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find();
  if (!announcements) throw new NotFoundError("No announcements");
  announcements.reverse();
  res.status(200).json(announcements);
};

//get a single announcement
export const getSingleAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) throw new NotFoundError("No announcement found");
  res.status(200).json(announcement);
};
