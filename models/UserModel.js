import { Schema, model } from "mongoose";
import { branches, courses } from "../utils/constants.js";

const attendanceSchema = new Schema({
  date: Date,
  attendedListening: Boolean,
  attendedReading: Boolean,
  attendedWriting: Boolean,
  attendedSpeaking: Boolean,
});

const performanceSchema = new Schema({
  date: Date,
  listeningScore: Number,
  readingScore: Number,
  writingScore: Number,
  speakingScore: Number,
  overallScore: Number,
});

const studentSchema = new Schema({
  active: {
    type: Boolean,
    default: false,
  },
  teacher: String,
  attendance: [attendanceSchema],
  joinedOn: Date,
  endedOn: Date,
  performance: [performanceSchema],
});

const teacherSchema = new Schema({
  hasVerified: {
    type: Boolean,
    default: false,
  },
  currentStudents: {
    type: [Object],
    default: [],
  },
  totalStudents: {
    type: [Object],
    default: [],
  },
  verifiedOn: Date,
  status: String,
});

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    age: {
      type: Number,
    },
    course: {
      type: String,
      enum: Object.values(courses),
      default: courses.IELTS_1_MONTH,
    },
    branch: {
      type: String,
      enum: Object.values(branches),
      default: branches.MEVARAM,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    password: String,
    studentDetails: {
      type: studentSchema,
      default: { active: false, teacher: "", attendance: [], performance: [] },
    },
    teacherDetails: {
      type: teacherSchema,
      default: null,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
