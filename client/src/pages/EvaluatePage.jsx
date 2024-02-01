import React from "react";
import { useSelector } from "react-redux";

function EvaluatePage() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      {!userInfo?.teacherDetails?.hasVerified ? (
        <h1 className="bg-red-800 text-white px-2 py-2">
          Your Profile is not verified. You will be able to access this page
          only after verification
        </h1>
      ) : (
        <div>
          <h1 className=" text-2xl font-semibold">Current Students</h1>
          <div className=" mt-7 mb-5">
            {userInfo?.teacherDetails?.currentStudents.length < 1 && (
              <h1 className="bg-red-800 text-white px-2 py-2">
                You Dont have any active students now. Please add new Students
              </h1>
            )}
            {userInfo?.teacherDetails?.currentStudents.length > 0 && (
              <table className="bg-blue-200 w-full text-center">
                <thead>
                  <tr className="border-b-2 border-b-blue-300">
                    <th className=" tablecolumn">NAME</th>
                    <th className=" tablecolumn">EVALUATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" tablecolumn">p</td>
                    <td className=" tablecolumn">p</td>
                  </tr>
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
