import { NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";

//get Unassigned Students
export const getUnassignedStudents = async (req, res) => {
  const students = await User.find({
    role: "student",
    branch: req.user.branch,
    "studentDetails.teacher": "",
  });
  if (!students) throw new NotFoundError("No students found");
  res.status(200).json(students);
};
