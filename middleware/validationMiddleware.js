import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required. "),
  body("email")
    .notEmpty()
    .withMessage("Email is required. ")
    .isEmail()
    .withMessage("Invalid email format. ")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("phone").notEmpty().withMessage("Phone Number is required. "),
  body("address").notEmpty().withMessage("Address is required. "),
  body("age").notEmpty().withMessage("Age is required. "),
  body("branch").notEmpty().withMessage("Branch is required. "),
  body("course").notEmpty().withMessage("Course is required. "),
  body("isTeacher")
    .notEmpty()
    .withMessage("Please select either teacher or student. "),
  body("password").notEmpty().withMessage("Password is required. "),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateProfileInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required. "),
  body("email")
    .notEmpty()
    .withMessage("Email is required. ")
    .isEmail()
    .withMessage("Invalid email format. ")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user._id.toString()) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("phone").notEmpty().withMessage("Phone Number is required. "),
  body("address").notEmpty().withMessage("Address is required. "),
  body("age").notEmpty().withMessage("Age is required. "),
]);

export const validateAnnouncementInput = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
]);

export const validateUpdateTeacherInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required. "),
  body("email")
    .notEmpty()
    .withMessage("Email is required. ")
    .isEmail()
    .withMessage("Invalid email format. ")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.params.id.toString()) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("phone").notEmpty().withMessage("Phone Number is required. "),
  body("address").notEmpty().withMessage("Address is required. "),
  body("branch").notEmpty().withMessage("Branch is required. "),
  body("course").notEmpty().withMessage("Course is required. "),
  body("age").notEmpty().withMessage("Age is required. "),
]);

export const validateEvaluateInput = withValidationErrors([
  body("date").notEmpty().withMessage("Date is required"),
  body("lattendance")
    .notEmpty()
    .withMessage("Listening attendance is required")
    .isBoolean()
    .withMessage("Invalid attendance format"),
  body("rattendance")
    .notEmpty()
    .withMessage("Reading attendance is required")
    .isBoolean()
    .withMessage("Invalid attendance format"),
  body("wattendance")
    .notEmpty()
    .withMessage("Writing attendance is required")
    .isBoolean()
    .withMessage("Invalid attendance format"),
  body("sattendance")
    .notEmpty()
    .withMessage("Speaking attendance is required")
    .isBoolean()
    .withMessage("Invalid attendance format"),
  body("lscore")
    .notEmpty()
    .withMessage("Listening score is required")
    .isNumeric()
    .withMessage("Invalid score format"),
  body("rscore")
    .notEmpty()
    .withMessage("Reading score is required")
    .isNumeric()
    .withMessage("Invalid score format"),
  body("wscore")
    .notEmpty()
    .withMessage("Writing score is required")
    .isNumeric()
    .withMessage("Invalid score format"),
  body("sscore")
    .notEmpty()
    .withMessage("Speaking score is required")
    .isNumeric()
    .withMessage("Invalid score format"),
]);
