import React from "react";
import { useSelector } from "react-redux";
import { useGetCurrentStudentsQuery } from "../slices/teacherApiSlice";
import Loading from "./Loading";

function CurrentStudentsView() {
  const { data: students, isLoading } = useGetCurrentStudentsQuery();
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Current Students</h1>
      <div className=" mt-7 mb-5">
        {students.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            You Dont have any active students now. Please add new Students
          </h1>
        )}
        {students.length > 0 && (
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">START</th>

                <th className="tablecolumn">LENGTH</th>
                <th className="tablecolumn"></th>
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
                    {x.course.includes("OET")
                      ? x.course.substring(4)
                      : x.course.substring(6)}
                  </td>
                  <td className=" tablecolumn flex flex-col gap-1 justify-center items-center md:flex-row">
                    <button className="bg-gray-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-md cursor-pointer">
                      END CLASS
                    </button>
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

export default CurrentStudentsView;
