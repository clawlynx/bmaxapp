import React, { useState } from "react";
import {
  useDeleteTeacherMutation,
  useGetAllTeachersQuery,
} from "../slices/adminApiSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { toast } from "react-toastify";

function TeacherList() {
  const { data: allTeachers, refetch, isLoading } = useGetAllTeachersQuery();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteTeacher, { isLoading: loadingDelete }] =
    useDeleteTeacherMutation();

  function cancelFunction() {
    setConfirmDelete(false);
    setDeleteId("");
  }
  async function confirmFunction() {
    try {
      await deleteTeacher(deleteId);
      setConfirmDelete(false);
      setDeleteId("");
      refetch();
      toast.success("Teacher deleted");
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section className=" mt-5">
      {confirmDelete && (
        <Modal
          title={"Are you sure want to delete?"}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      <h4 className="form-title mb-8 text-2xl font-semibold">
        {allTeachers.totalTeachers}
        {` teacher${allTeachers.totalTeachers === 0 ? "" : "'s"} found`}
      </h4>
      {allTeachers.totalTeachers > 0 && (
        <div className="mt-7 mb-5">
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">BRANCH</th>
                <th className="tablecolumn">COURSE</th>
                <th className="tablecolumn">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {allTeachers.teachers.map((x) => (
                <tr key={x._id}>
                  <td className=" tablecolumn">{x.name}</td>
                  <td className=" tablecolumn">{x.branch}</td>
                  <td className=" tablecolumn">
                    {x.course.includes("OET")
                      ? x.course.substring(0, 3)
                      : x.course.substring(0, 5)}
                  </td>
                  <td className=" tablecolumn flex flex-col gap-1 justify-center items-center md:flex-row">
                    <Link className="bg-blue-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-blue-500 text-xs md:text-md cursor-pointer">
                      Details
                    </Link>
                    <Link className="bg-gray-700 text-white  px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-md cursor-pointer">
                      Edit
                    </Link>
                    <button
                      className="bg-red-700 text-white  px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-red-500 text-xs md:text-md cursor-pointer"
                      onClick={() => {
                        setConfirmDelete(true);
                        setDeleteId(x._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TeacherList;
