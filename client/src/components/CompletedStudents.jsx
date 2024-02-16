import React from "react";
import { useSelector } from "react-redux";
import { useGetCompletedStudentsQuery } from "../slices/teacherApiSlice";
import Loading from "./Loading";

function CompletedStudents() {
  const { userInfo } = useSelector((state) => state.user);
  const { data: students, isLoading } = useGetCompletedStudentsQuery();
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Completed Students</h1>
      <div className=" mt-7 mb-5">
        {students.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            You Dont have any completed Students
          </h1>
        )}
        {students.length > 0 && (
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">START</th>
                <th className="tablecolumn">END</th>
                <th className="tablecolumn">LENGTH</th>
              </tr>
            </thead>
            <tbody>
              {students.map((x) => (
                <tr key={x._id}>
                  <td className=" tablecolumn">{x.name}</td>
                  <td className=" tablecolumn">
                    {x.studentDetails.joinedOn.substring(0, 10)}
                  </td>
                  <td className=" tablecolumn">
                    {x.studentDetails.endedOn.substring(0, 10)}
                  </td>
                  <td className=" tablecolumn">
                    {x.course.includes("OET")
                      ? x.course.substring(4)
                      : x.course.substring(6)}
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

export default CompletedStudents;
