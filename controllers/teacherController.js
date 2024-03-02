import mongoose from "mongoose";
import { NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { findOverall } from "../utils/overallFinder.js";

//complete class of a student
export const completeStudent = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) throw new NotFoundError("No Student found");
  student.studentDetails.active = false;
  student.studentDetails.endedOn = new Date(Date.now()).toISOString();
  await student.save();
  const teacher = await User.findById(req.user._id);
  if (!teacher) throw new NotFoundError("No teacher found");
  teacher.teacherDetails.completedStudents.push(student._id);
  const newOne = teacher.teacherDetails.currentStudents.filter(
    (x) => x._id.toString() !== student._id.toString()
  );
  teacher.teacherDetails.currentStudents = newOne;

  await teacher.save();
  res.status(200).json({ msg: "successfull", teacher });
};

//get list of current students
export const getCurrentStudents = async (req, res) => {
  const students = await User.find({
    role: "student",
    "studentDetails.teacher": req.user.name,
    "studentDetails.active": true,
  });
  if (!students) throw new NotFoundError("No students found");
  res.status(200).json(students);
};

//get list of completed students
export const getCompletedStudents = async (req, res) => {
  const students = await User.find({
    role: "student",
    "studentDetails.teacher": req.user.name,
    "studentDetails.active": false,
  });
  if (!students) throw new NotFoundError("No Students found");
  res.status(200).json(students);
};

//marking attendance and score
export const evaluateStudent = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) throw new NotFoundError("No student found");
  const total =
    Number(req.body.lscore) +
    Number(req.body.rscore) +
    Number(req.body.wscore) +
    Number(req.body.sscore);
  const overall = await findOverall(total);
  const attendanceObject = {
    date: new Date(req.body.date),
    attendedListening: req.body.lattendance,
    attendedReading: req.body.rattendance,
    attendedWriting: req.body.wattendance,
    attendedSpeaking: req.body.sattendance,
  };
  const performanceObject = {
    date: new Date(req.body.date).toISOString(),
    listeningScore: req.body.lscore,
    readingScore: req.body.rscore,
    writingScore: req.body.wscore,
    speakingScore: req.body.sscore,
    overallScore: overall,
  };
  student.studentDetails.attendance.push(attendanceObject);
  student.studentDetails.performance.push(performanceObject);
  await student.save();
  res.status(200).json({ msg: "successfully updated" });
};
