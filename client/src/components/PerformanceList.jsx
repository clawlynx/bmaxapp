import React from "react";
import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../slices/userApiSlice";
import Loading from "./Loading";

function PerformanceList() {
  const { data: userInfo, isLoading } = useGetUserInfoQuery();
  return isLoading ? (
    <Loading />
  ) : (
    <div className=" mt-7">
      {userInfo?.studentDetails?.performance?.length < 1 && (
        <h1 className="bg-red-800 text-white px-2 py-2">
          There are no Records of your Scores. Your class is not been started
          yet or your Score has not been marked
        </h1>
      )}
      {userInfo?.studentDetails?.performance.length > 0 && (
        <table className="bg-blue-200 w-full text-center">
          <thead>
            <tr className="border-b-2 border-b-blue-300">
              <th className=" tablecolumn">DATE</th>
              <th className=" tablecolumn">L</th>
              <th className="tablecolumn">R</th>
              <th className="tablecolumn">W</th>
              <th className="tablecolumn">S</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.studentDetails.performance.map((x) => (
              <tr key={x._id}>
                <td className=" tablecolumn">{x.date.substring(0, 10)}</td>
                <td className=" tablecolumn">{x.listeningScore}</td>
                <td className=" tablecolumn">{x.readingScore}</td>
                <td className=" tablecolumn">{x.writingScore}</td>
                <td className=" tablecolumn">{x.speakingScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PerformanceList;
