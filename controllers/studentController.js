import { NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";

export const getScoreStats = async (req, res) => {
  const student = await User.findById(req.user._id);
  if (!student) throw new NotFoundError("Student not found");
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
