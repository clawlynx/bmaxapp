import React from "react";
import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../slices/userApiSlice";
import Loading from "../components/Loading";

function AttendancePage() {
  const { data: userInfo, isLoading } = useGetUserInfoQuery();
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className=" grid grid-cols-1 justify-center md:justify-start md:grid-cols-2 text-xs md:text-base">
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
              {userInfo?.studentDetails?.attendance.map((x) => (
                <tr key={x._id}>
                  <td className=" tablecolumn">{x.date.substring(0, 10)}</td>
                  <td className="tablecolumn flex">
                    {x.attendedListening ? (
                      <span className="text-green-700">P</span>
                    ) : (
                      <span className="text-red-700">A</span>
                    )}
                  </td>
                  <td className=" tablecolumn">
                    {x.attendedReading ? (
                      <span className="text-green-700">P</span>
                    ) : (
                      <span className="text-red-700">A</span>
                    )}
                  </td>
                  <td className=" tablecolumn">
                    {x.attendedWriting ? (
                      <span className="text-green-700">P</span>
                    ) : (
                      <span className="text-red-700">A</span>
                    )}
                  </td>
                  <td className=" tablecolumn">
                    {x.attendedSpeaking ? (
                      <span className="text-green-700">P</span>
                    ) : (
                      <span className="text-red-700">A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AttendancePage;
/** */
