import { NotFoundError } from "../errors/customErrors.js";
import Announcement from "../models/Announcement.js";
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

export const createAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  const date = new Date(Date.now()).toISOString();
  const createdBy = req.user._id;
  const newAnnouncement = new Announcement({
    title,
    content,
    date,
    createdBy,
  });
  await newAnnouncement.save();
  res.status(201).json(newAnnouncement);
};

export const deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) throw new NotFoundError("No Announcement Found");
  await Announcement.deleteOne({ _id: announcement._id });
  res.status(200).json({ msg: "Successfully deleted" });
};

export const updateAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.params.id);
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) throw new NotFoundError("No announcement found");
  announcement.title = title;
  announcement.content = content;
  const updatedAnnouncement = await announcement.save();
  res.status(200).json(updatedAnnouncement);
};
