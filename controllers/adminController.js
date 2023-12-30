import User from "../models/UserModel.js";

export const totalCount = async (req, res) => {
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const totalStudents = await User.countDocuments({ role: "student" });
  res.status(200).json({ totalStudents, totalTeachers });
};
