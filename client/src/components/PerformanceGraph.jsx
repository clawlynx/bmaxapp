import React from "react";
import {} from "recharts";
import { useGetUserInfoQuery } from "../slices/userApiSlice";
import Loading from "./Loading";

function PerformanceGraph() {
  const { data: userInfo, isLoading } = useGetUserInfoQuery();
  const performanceArray = userInfo?.studentDetails?.performance;
  const listeningData = performanceArray.forEach((x) => {});

  return isLoading ? (
    <Loading />
  ) : performanceArray.length < 0 ? (
    <h1 className="bg-red-800 text-white px-2 py-2">
      There are no Records of your Scores. Your class is not been started yet or
      your Score has not been marked
    </h1>
  ) : (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Listening</h1>
    </div>
  );
}

export default PerformanceGraph;
