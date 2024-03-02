import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCompleteStudentMutation,
  useGetCompletedStudentsQuery,
  useGetCurrentStudentsQuery,
} from "../slices/teacherApiSlice";
import Loading from "./Loading";
import Modal from "./Modal";
import { setUser } from "../slices/userSlice";
import { toast } from "react-toastify";

function CurrentStudentsView() {
  const [action, setAction] = useState(false);
  const [completeId, setCompleteId] = useState("");
  const dispatch = useDispatch();
  const { data: students, refetch, isLoading } = useGetCurrentStudentsQuery();
  const [completeStudent, { isLoading: loadingcomplete }] =
    useCompleteStudentMutation();
  const { refetch: refetch2 } = useGetCompletedStudentsQuery();

  function cancelFunction() {
    setAction(false);
    setCompleteId("");
  }

  async function confirmFunction() {
    try {
      const res = await completeStudent(completeId).unwrap();
      setAction(false);
      setCompleteId("");
      refetch();
      refetch2();
      dispatch(setUser(res.teacher));
      toast.success("Student added");
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {action && (
        <Modal
          title={"Are you sure want to end the class of the student?"}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      <h1 className="text-xl md:text-2xl font-semibold">Current Students</h1>
      <div className=" mt-7 mb-5">
        {students.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            You Dont have any active students now.
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
                    <button
                      className="bg-gray-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-md cursor-pointer"
                      onClick={() => {
                        setAction(true);
                        setCompleteId(x._id);
                      }}
                    >
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
