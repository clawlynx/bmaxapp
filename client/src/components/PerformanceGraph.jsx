import React from "react";

import { useGetUserInfoQuery } from "../slices/userApiSlice";
import Loading from "./Loading";
import { useGetGraphStatsQuery } from "../slices/studentApiSlice";
import GraphComponent from "./GraphComponent";
import { useSelector } from "react-redux";

function PerformanceGraph() {
  const { userInfo } = useSelector((state) => state.user);
  const { data: graphStats, isLoading } = useGetGraphStatsQuery();
  console.log(graphStats);

  return isLoading ? (
    <Loading />
  ) : graphStats.performanceArray.length < 1 ? (
    <h1 className="bg-red-800 text-white px-2 py-2 mt-4">
      There are no Records of your Scores. Your class is not been started yet or
      your Score has not been marked
    </h1>
  ) : (
    <div className=" mt-4">
      <h1 className="text-xl md:text-2xl font-semibold">Listening</h1>
      <GraphComponent data={graphStats.listeningData} />
      <h1 className="text-xl md:text-2xl font-semibold">Reading</h1>
      <GraphComponent data={graphStats.readingData} />
      <h1 className="text-xl md:text-2xl font-semibold">Writing</h1>
      <GraphComponent data={graphStats.writingData} />
      <h1 className="text-xl md:text-2xl font-semibold">Speaking</h1>
      <GraphComponent data={graphStats.speakingData} />
      {userInfo?.course?.includes("IELTS") && (
        <>
          <h1 className="text-xl md:text-2xl font-semibold">Overall</h1>
          <GraphComponent data={graphStats.overallData} />
        </>
      )}
    </div>
  );
}

export default PerformanceGraph;
