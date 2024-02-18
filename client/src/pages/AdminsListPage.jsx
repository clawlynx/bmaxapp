import React, { useState } from "react";
import {
  useGetAdminsQuery,
  useRemoveAdminMutation,
} from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function AdminsListPage() {
  const { data: admins, refetch, isLoading } = useGetAdminsQuery();
  const [action, setAction] = useState(false);
  const [actionId, setActionId] = useState("");
  const [removeAdmin, { isLoading: loadingRemove }] = useRemoveAdminMutation();

  function cancelFunction() {
    setAction(false);
    setActionId("");
  }
  async function confirmFunction() {
    try {
      await removeAdmin(actionId).unwrap();
      setAction(false);
      setActionId("");
      refetch();
      toast.success("Successfully removed");
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
          title={"Are you sure want to remove this user as Admin?"}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      <h1 className="text-xl md:text-2xl font-semibold">Admins</h1>
      <div className=" mt-4 mb-4">
        {admins.length > 0 && (
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">PHONE</th>
                <th className="tablecolumn">EMAIL</th>
                <th className="tablecolumn">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((x) => (
                <tr key={x._id}>
                  <td className=" tablecolumn">{x.name}</td>
                  <td className=" tablecolumn">{x.phone}</td>
                  <td className=" tablecolumn">{x.email}</td>
                  <td className=" tablecolumn ">
                    <button
                      className="bg-gray-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-md cursor-pointer"
                      disabled={x.mainAdmin}
                      onClick={() => {
                        setAction(true);
                        setActionId(x._id);
                      }}
                    >
                      REMOVE
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

export default AdminsListPage;
