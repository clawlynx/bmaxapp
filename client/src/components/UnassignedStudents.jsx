import React, { useState } from "react";
import {
  useAddStudentMutation,
  useGetCurrentStudentsQuery,
  useGetUnassignedQuery,
} from "../slices/teacherApiSlice";
import Loading from "./Loading";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

function UnassignedStudents() {
  const { data: unassigned, refetch, isLoading } = useGetUnassignedQuery();
  const [assign, setAssign] = useState(false);
  const [assignId, setAssignId] = useState("");
  const [addStudent, { isLoading: assignLoading }] = useAddStudentMutation();
  const { refetch: refetch2 } = useGetCurrentStudentsQuery();
  const dispatch = useDispatch();

  function cancelFunction() {
    setAssign(false);
    setAssignId("");
  }

  async function confirmFunction() {
    try {
      const res = await addStudent(assignId).unwrap();
      setAssign(false);
      setAssignId("");
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
      {assign && (
        <Modal
          title={"Are you sure want to add the student?"}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      <h1 className="text-xl md:text-2xl font-semibold">Unassigned Students</h1>
      <div className="mt-7 mb-5">
        {unassigned.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            There are no students to assign for your branch
          </h1>
        )}
        {unassigned.length > 0 && (
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">LENGTH</th>
                <th className="tablecolumn">ADD</th>
              </tr>
            </thead>
            <tbody>
              {unassigned.map((x) => (
                <tr key={x._id}>
                  <td className=" tablecolumn">{x.name}</td>
                  <td className=" tablecolumn">
                    {x.course.includes("OET")
                      ? x.course.substring(4)
                      : x.course.substring(6)}
                  </td>
                  <td className=" tablecolumn flex flex-col gap-1 justify-center items-center md:flex-row">
                    <button
                      className="bg-blue-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-blue-500 text-xs md:text-md cursor-pointer"
                      onClick={() => {
                        setAssign(true);
                        setAssignId(x._id);
                      }}
                    >
                      ADD
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

export default UnassignedStudents;
