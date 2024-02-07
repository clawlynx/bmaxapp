import React from "react";
import { useSelector } from "react-redux";

function AttendancePage() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <div className=" grid grid-cols-1 justify-start md:grid-cols-2">
        <div className="flex gap-4 md:gap-12 mb-5 font-semibold">
          <p>Course</p>
          <p>:</p>
          <p>{userInfo?.course}</p>
        </div>
        <div className="flex gap-4 md:gap-12 mb-5 font-semibold">
          <p>Branch</p>
          <p>:</p>
          <p>{userInfo?.branch}</p>
        </div>
        <div className="flex gap-4 md:gap-12 mb-5 font-semibold">
          <p>Tutor</p>
          <p>:</p>
          <p>{userInfo?.studentDetails?.teacher}</p>
        </div>
        <div className="flex gap-4 md:gap-12 mb-5 font-semibold">
          <p>Start Date</p>
          <p>:</p>
          <p>
            {userInfo?.studentDetails?.joinedOn?.substring(0, 10) ||
              "Not Started"}
          </p>
        </div>
        <div className="flex gap-4 md:gap-12 mb-5 font-semibold">
          <p>End Date</p>
          <p>:</p>
          <p>{userInfo?.studentDetails?.endedOn || "N/A"}</p>
        </div>
      </div>
      <div className=" mt-7">
        {userInfo?.studentDetails?.attendance?.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            There are no Records of attendance. Your class is not been started
            yet or your attendance has not been marked
          </h1>
        )}
        {userInfo?.studentDetails?.attendance.length > 0 && (
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
    </div>
  );
}

export default AttendancePage;
