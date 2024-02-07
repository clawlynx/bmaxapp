import React from "react";
import { useSelector } from "react-redux";

function CompletedStudents() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Completed Students</h1>
      <div className=" mt-7 mb-5">
        {userInfo?.teacherDetails?.completedStudents.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            You Dont have any completed Students
          </h1>
        )}
        {userInfo?.teacherDetails?.completedStudents.length > 0 && (
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">START</th>
                <th className="tablecolumn">END</th>
                <th className="tablecolumn">LENGTH</th>
                <th className="tablecolumn"></th>
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

export default CompletedStudents;
