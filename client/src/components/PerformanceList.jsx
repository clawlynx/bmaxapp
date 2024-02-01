import React from "react";
import { useSelector } from "react-redux";

function PerformanceList() {
  const { userInfo } = useSelector((state) => state.user);
  return (
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
            <tr>
              <td className=" tablecolumn">p</td>
              <td className=" tablecolumn">p</td>
              <td className=" tablecolumn">p</td>
              <td className=" tablecolumn">p</td>
              <td className=" tablecolumn">p</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PerformanceList;
