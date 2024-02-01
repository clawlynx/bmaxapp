import { NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";

export const totalCount = async (req, res) => {
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const totalStudents = await User.countDocuments({ role: "student" });
  res.status(200).json({ totalStudents, totalTeachers });
};

export const allTeachers = async (req, res) => {
  const teachers = await User.find({ role: "teacher" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  if (!teachers) throw new NotFoundError("No Teachers Found");
  res.status(200).json({ totalTeachers, teachers });
};

export const allStudents = async (req, res) => {
  const students = await User.find({ role: "student" });
  const totalStudents = await User.countDocuments({ role: "student" });
  if (!students) throw new NotFoundError("No Students found");
  res.status(200).json({ totalStudents, students });
};

export const getPendingVerifications = async (req, res) => {
  const users = await User.find({ "teacherDetails.hasVerified": false });
  if (!users) throw new NotFoundError("No Users found");
  res.status(200).json(users);
};
