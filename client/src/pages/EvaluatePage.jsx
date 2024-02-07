import React from "react";
import { useSelector } from "react-redux";
import { useGetCurrentStudentsQuery } from "../slices/teacherApiSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function EvaluatePage() {
  const { userInfo } = useSelector((state) => state.user);
  const { data: students, isLoading } = useGetCurrentStudentsQuery();
  return (
    <div>
      {!userInfo?.teacherDetails?.hasVerified ? (
        <h1 className="bg-red-800 text-white px-2 py-2">
          Your Profile is not verified. You will be able to access this page
          only after verification
        </h1>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className=" text-2xl font-semibold">Current Students</h1>
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
                    <th className=" tablecolumn">EVALUATE</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((x) => (
                    <tr key={x._id}>
                      <td className=" tablecolumn">{x.name}</td>
                      <td className="text-xs lg:text-lg border md:px-3 sm:px-1 py-2 flex flex-col gap-1 justify-center items-center md:flex-row">
                        <Link
                          to={`/dashboard/evaluate/mark/${x._id}`}
                          className="bg-blue-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-blue-500 text-xs md:text-md cursor-pointer"
                        >
                          EVALUATE
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EvaluatePage;
