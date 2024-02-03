import React, { useState } from "react";
import {
  useDeleteTeacherMutation,
  useGetAllPendingVerificationQuery,
} from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function VerificationPage() {
  const {
    data: users,
    refetch,
    isLoading,
  } = useGetAllPendingVerificationQuery();
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
    <div>
      {confirmDelete && (
        <Modal
          title={"Are you sure want to delete?"}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      <h1 className="text-xl md:text-2xl font-semibold">
        Pending Verifications
      </h1>
      {users.length === 0 && (
        <h1 className="bg-blue-200 text-black px-2 py-2 mt-4">
          There are no pending verifications
        </h1>
      )}
      <table className="bg-blue-200 w-full text-center mt-4">
        <thead>
          <tr className="border-b-2 border-b-blue-300">
            <th className=" tablecolumn">NAME</th>
            <th className=" tablecolumn">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => (
            <tr key={x._id}>
              <td className=" tablecolumn">{x.name}</td>
              <td className="text-xs lg:text-lg border md:px-3 sm:px-1 py-2  flex flex-col gap-1 justify-center items-center md:flex-row">
                <Link
                  to={`/dashboard/verification/${x._id}`}
                  className="bg-gray-700 text-white  px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-md cursor-pointer"
                >
                  Verify
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
  );
}

export default VerificationPage;
