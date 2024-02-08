import React from "react";
import { FaHeadphones } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa6";
import { RiSpeakFill } from "react-icons/ri";
import { FaPenRuler } from "react-icons/fa6";
import StatsItem from "../components/StatsItem";

import Loading from "./Loading";
import { useGetScoreStatsQuery } from "../slices/studentApiSlice";

function StatsContainer() {
  const { data: scoreStats, isLoading } = useGetScoreStatsQuery();

  return isLoading ? (
    <Loading />
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <StatsItem
        icon={<FaHeadphones />}
        heading={"LISTENING"}
        currentscore={
          scoreStats.performanceArray.length > 1 &&
          scoreStats.performanceArray[scoreStats.performanceArray.length - 1]
            .listeningScore
        }
        highscore={scoreStats.highestlscore}
      />
      <StatsItem
        icon={<FaBookOpenReader />}
        heading={"READING"}
        currentscore={
          scoreStats.performanceArray.length > 1 &&
          scoreStats.performanceArray[scoreStats.performanceArray.length - 1]
            .readingScore
        }
        highscore={scoreStats.highestrscore}
      />
      <StatsItem
        icon={<FaPenNib />}
        heading={"WRITING"}
        currentscore={
          scoreStats.performanceArray.length > 1 &&
          scoreStats.performanceArray[scoreStats.performanceArray.length - 1]
            .writingScore
        }
        highscore={scoreStats.highestwscore}
      />
      <StatsItem
        icon={<RiSpeakFill />}
        heading={"SPEAKING"}
        currentscore={
          scoreStats.performanceArray.length > 1 &&
          scoreStats.performanceArray[scoreStats.performanceArray.length - 1]
            .speakingScore
        }
        highscore={scoreStats.highestsscore}
      />
      {scoreStats?.course?.includes("IELTS") && (
        <StatsItem
          icon={<FaPenRuler />}
          heading={"OVERALL"}
          currentscore={
            scoreStats.performanceArray.length > 1 &&
            scoreStats.performanceArray[scoreStats.performanceArray.length - 1]
              .overallScore
          }
          highscore={scoreStats.highestoscore}
        />
      )}
    </div>
  );
}

export default StatsContainer;
