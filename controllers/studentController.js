import { NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";

//get the stats of individual score fore stats container
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

//get stats for performance graph
export const getGraphStats = async (req, res) => {
  const student = await User.findById(req.user._id);
  if (!student) throw new NotFoundError("No student found");
  const performanceArray = student.studentDetails.performance;
  if (performanceArray.length > 0) {
    const listeningData = performanceArray.map((x) => {
      return {
        date: x.date.toLocaleDateString(),
        score: x.listeningScore,
      };
    });
    const readingData = performanceArray.map((x) => {
      return {
        date: x.date.toLocaleDateString(),
        score: x.readingScore,
      };
    });
    const writingData = performanceArray.map((x) => {
      return {
        date: x.date.toLocaleDateString(),
        score: x.writingScore,
      };
    });
    const speakingData = performanceArray.map((x) => {
      return {
        date: x.date.toLocaleDateString(),
        score: x.speakingScore,
      };
    });
    const overallData = performanceArray.map((x) => {
      if (x.overallScore) {
        return {
          date: x.date.toLocaleDateString(),
          score: x.overallScore,
        };
      } else {
        return [];
      }
    });
    res.status(200).json({
      performanceArray,
      listeningData,
      readingData,
      writingData,
      speakingData,
      overallData,
    });
  } else {
    res.json({
      performanceArray,
      listeningData: [],
      readingData: [],
      writingData: [],
      speakingData: [],
      overallData: [],
    });
  }
};
