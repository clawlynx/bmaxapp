import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAnnouncementsQuery } from "../slices/userApiSlice";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useDeleteAnnouncementMutation } from "../slices/adminApiSlice";
import { toast } from "react-toastify";

function AnnouncementPage() {
  const { userInfo } = useSelector((state) => state.user);
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const {
    data: announcements,
    refetch,
    isLoading,
  } = useGetAnnouncementsQuery();
  const [deleteAnnouncement, { isLoading: deleteLoading }] =
    useDeleteAnnouncementMutation();

  function handleDeleteButton(id) {
    setDeleteId(id);
    setConfirm(true);
  }

  function cancelFunction() {
    setDeleteId("");
    setConfirm(false);
  }

  async function confirmFunction() {
    try {
      await deleteAnnouncement(deleteId).unwrap();
      setDeleteId("");
      setConfirm(false);
      refetch();
      toast.success("Announcement deleted");
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="">
      {confirm && (
        <Modal
          title={"Are you sure want to delete?"}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      <h1 className="text-2xl mb-5 font-semibold">Announcements</h1>
      {userInfo.role === "admin" && (
        <Link
          to={"/dashboard/announcements/new"}
          className=" bg-blue-700 text-white px-2 py-2 rounded-md hover:bg-blue-500 mb-4"
        >
          ADD ANNOUNCEMENT
        </Link>
      )}
      {announcements.length < 1 && (
        <div className="h-14 w-full bg-blue-200 flex items-center justify-start px-4 py-2 mt-4">
          <p>There are no announcements</p>
        </div>
      )}
      <table className="bg-blue-200 w-full text-center mt-4">
        <thead>
          <tr className="border-b-2 border-b-blue-300">
            <th className=" tablecolumn">DATE</th>
            <th className=" tablecolumn">TITLE</th>
            <th className="tablecolumn">VIEW</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length > 0 &&
            announcements.map((x) => (
              <tr key={x._id}>
                <td className=" tablecolumn">{x.date.substring(0, 10)}</td>
                <td className=" tablecolumn">{x.title}</td>
                <td className=" tablecolumn flex flex-col gap-1 justify-center items-center md:flex-row">
                  <Link
                    to={`/dashboard/announcements/${x._id}`}
                    className="bg-blue-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-blue-500 text-xs md:text-md cursor-pointer"
                  >
                    Details
                  </Link>
                  {userInfo?.role === "admin" && (
                    <>
                      <Link
                        to={`/dashboard/announcements/edit/${x._id}`}
                        className="bg-gray-700 text-white  px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-md cursor-pointer"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-700 text-white  px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-red-500 text-xs md:text-md cursor-pointer"
                        onClick={() => handleDeleteButton(x._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnnouncementPage;
