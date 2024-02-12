import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetSingleStudentQuery,
  useGetStudentScoreStatsQuery,
} from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import DetailComponent from "../components/DetailComponent";
import StatsItem from "../components/StatsItem";
import { FaHeadphones, FaPenNib } from "react-icons/fa";
import { FaBookOpenReader, FaPenRuler } from "react-icons/fa6";
import { RiSpeakFill } from "react-icons/ri";

function StudentDetailsAdmin() {
  const { id } = useParams();
  const { data: student, isLoading } = useGetSingleStudentQuery(id);
  const { data: scoreStats, isLoading: loadingStats } =
    useGetStudentScoreStatsQuery(id);
  console.log(scoreStats);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Details</h1>
      <div className="mt-3 mb-6 bg-blue-100 p-2 md:p-6 text-sm md:text-base">
        <DetailComponent title={"NAME"} detail={student.name} />
        <DetailComponent title={"COURSE"} detail={student.course} />
        <DetailComponent title={"BRANCH"} detail={student.branch} />
        <DetailComponent title={"EMAIL"} detail={student.email} />
        <DetailComponent title={"ADDRESS"} detail={student.address} />
        <DetailComponent title={"PHONE"} detail={student.phone} />
        <DetailComponent title={"AGE"} detail={student.age} />
        <DetailComponent
          title={"TUTOR"}
          detail={student.studentDetails?.teacher || ""}
        />
        <DetailComponent
          title={"CLASS STARTED"}
          detail={student.studentDetails?.joinedOn?.substring(0, 10) || "N/A"}
        />
        <DetailComponent
          title={"CLASS ENDED"}
          detail={student.studentDetails?.endedOn?.substring(0, 10) || "N/A"}
        />
      </div>
      <div className="flex gap-2 justify-end text-lg">
        <Link
          to={"/dashboard/all-students"}
          className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
        >
          Back
        </Link>
      </div>
      {loadingStats ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
          <StatsItem
            icon={<FaHeadphones />}
            heading={"LISTENING"}
            currentscore={
              scoreStats.performanceArray.length > 1 &&
              scoreStats.performanceArray[
                scoreStats.performanceArray.length - 1
              ].listeningScore
            }
            highscore={scoreStats.highestlscore}
          />
          <StatsItem
            icon={<FaBookOpenReader />}
            heading={"READING"}
            currentscore={
              scoreStats.performanceArray.length > 1 &&
              scoreStats.performanceArray[
                scoreStats.performanceArray.length - 1
              ].readingScore
            }
            highscore={scoreStats.highestrscore}
          />
          <StatsItem
            icon={<FaPenNib />}
            heading={"WRITING"}
            currentscore={
              scoreStats.performanceArray.length > 1 &&
              scoreStats.performanceArray[
                scoreStats.performanceArray.length - 1
              ].writingScore
            }
            highscore={scoreStats.highestwscore}
          />
          <StatsItem
            icon={<RiSpeakFill />}
            heading={"SPEAKING"}
            currentscore={
              scoreStats.performanceArray.length > 1 &&
              scoreStats.performanceArray[
                scoreStats.performanceArray.length - 1
              ].speakingScore
            }
            highscore={scoreStats.highestsscore}
          />
          {student?.course.includes("IELTS") && (
            <StatsItem
              icon={<FaPenRuler />}
              heading={"OVERALL"}
              currentscore={
                scoreStats.performanceArray.length > 1 &&
                scoreStats.performanceArray[
                  scoreStats.performanceArray.length - 1
                ].overallScore
              }
              highscore={scoreStats.highestoscore}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default StudentDetailsAdmin;
