import { NotFoundError } from "../errors/customErrors.js";
import Announcement from "../models/Announcement.js";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordutils.js";

//total count of teacher and students
export const totalCount = async (req, res) => {
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const totalStudents = await User.countDocuments({ role: "student" });
  res.status(200).json({ totalStudents, totalTeachers });
};

//get list of all teachers
export const allTeachers = async (req, res) => {
  const teachers = await User.find({ role: "teacher" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  if (!teachers) throw new NotFoundError("No Teachers Found");
  res.status(200).json({ totalTeachers, teachers });
};

//get list of all students
export const allStudents = async (req, res) => {
  const students = await User.find({ role: "student" });
  const totalStudents = await User.countDocuments({ role: "student" });
  if (!students) throw new NotFoundError("No Students found");
  res.status(200).json({ totalStudents, students });
};

//get list of teachers with pending verification
export const getPendingVerifications = async (req, res) => {
  const users = await User.find({ "teacherDetails.hasVerified": false });
  if (!users) throw new NotFoundError("No Users found");
  res.status(200).json(users);
};

//create a new announcement
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

//delete an existing announcement
export const deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) throw new NotFoundError("No Announcement Found");
  await Announcement.deleteOne({ _id: announcement._id });
  res.status(200).json({ msg: "Successfully deleted" });
};

//update an existing announcement
export const updateAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) throw new NotFoundError("No announcement found");
  announcement.title = title;
  announcement.content = content;
  const updatedAnnouncement = await announcement.save();
  res.status(200).json(updatedAnnouncement);
};

//delete an existing teacher
export const deleteTeacher = async (req, res) => {
  const teacher = await User.findById(req.params.id);
  if (!teacher) throw new NotFoundError("No teacher found");
  await User.deleteOne({ _id: teacher._id });
  res.status(200).json({ msg: "successfully deleted" });
};

//delete an existing student
export const deleteStudent = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) throw new NotFoundError("No student found");
  await User.deleteOne({ _id: student._id });
  res.status(200).json({ msg: "successfully deleted" });
};

//get a single teacher
export const getSingleTeacher = async (req, res) => {
  const teacher = await User.findById(req.params.id).populate(
    "teacherDetails.currentStudents"
  );
  if (!teacher) throw new NotFoundError("No teacher found");
  res.status(200).json(teacher);
};

//get a single student
export const getSingleStudent = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) throw new NotFoundError("No student found");
  res.status(200).json(student);
};

//verify teacher
export const verifyTeacher = async (req, res) => {
  const teacher = await User.findById(req.params.id);
  if (!teacher) throw new NotFoundError("No teacher found");
  teacher.teacherDetails.hasVerified = true;
  teacher.teacherDetails.verifiedOn = new Date(Date.now()).toISOString();
  teacher.teacherDetails.status = "ACTIVE";
  await teacher.save();
  res.status(200).json({ msg: "Successfully verified" });
};

//update a teacher
export const editTeacher = async (req, res) => {
  const teacher = await User.findById(req.params.id);
  if (!teacher) throw new NotFoundError("No Teacher Found");
  if (teacher.name !== req.body.name) {
    await User.updateMany(
      { "studentDetails.teacher": teacher.name },
      { "studentDetails.teacher": req.body.name }
    );
  }
  teacher.name = req.body.name;
  teacher.address = req.body.address;
  teacher.age = req.body.age;
  teacher.email = req.body.email;
  teacher.branch = req.body.branch;
  teacher.course = req.body.course;
  teacher.phone = req.body.phone;
  if (req.body.password !== "") {
    teacher.password = await hashPassword(req.body.password);
  }
  await teacher.save();
  res.status(200).json({ msg: "Successfully updated" });
};

//update a student
export const editStudent = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) throw new NotFoundError("No Student Found");
  student.name = req.body.name;
  student.address = req.body.address;
  student.age = req.body.age;
  student.email = req.body.email;
  student.branch = req.body.branch;
  student.course = req.body.course;
  student.phone = req.body.phone;
  if (req.body.password !== "") {
    student.password = await hashPassword(req.body.password);
  }
  await student.save();
  res.status(200).json({ msg: "Successfully updated" });
};

//get stats of individual students
export const getIndividualStats = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) throw new NotFoundError("No student found");
  const performanceArray = student.studentDetails.performance;
  const course = student.course;
  let highestlscore = 0;
  let highestrscore = 0;
  let highestwscore = 0;
  let highestsscore = 0;
  let highestoscore = 0;
  performanceArray?.forEach((element) => {
    if (element.listeningScore > highestlscore) {
      highestlscore = element.listeningScore;
    }
    if (element.readingScore > highestrscore) {
      highestrscore = element.readingScore;
    }
    if (element.writingScore > highestwscore) {
      highestwscore = element.writingScore;
    }
    if (element.speakingScore > highestsscore) {
      highestsscore = element.speakingScore;
    }
    if (element.overallScore && element.overallScore > highestoscore) {
      highestoscore = element.overallScore;
    }
  });
  res.status(200).json({
    course,
    performanceArray,
    highestlscore,
    highestoscore,
    highestrscore,
    highestwscore,
    highestsscore,
  });
};
