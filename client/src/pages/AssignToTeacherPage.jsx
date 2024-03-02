import React, { useState } from "react";
import Loading from "../components/Loading";
import DetailComponent from "../components/DetailComponent";
import {
  useAssignStudentMutation,
  useGetAvailableTeachersQuery,
  useGetSingleStudentQuery,
  useGetUnassignedQuery,
} from "../slices/adminApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormSelectElement from "../components/FormSelectElement";
import { branches } from "../../../utils/constants";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function AssignToTeacherPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState("ALL");
  const [action, setAction] = useState(false);
  const [actionId, setActionId] = useState("");
  const [actionName, setActionName] = useState("");
  const { data: student, isLoading } = useGetSingleStudentQuery(id);
  const { data: available, isLoading: teacherLoading } =
    useGetAvailableTeachersQuery({ id, branch });
  const [assignStudent] = useAssignStudentMutation();
  const { refetch } = useGetUnassignedQuery();

  function cancelFunction() {
    setAction(false);
    setActionId("");
    setActionName("");
  }
  async function confirmFunction() {
    const dataObject = {
      studentId: id,
      teacherId: actionId,
    };
    try {
      await assignStudent(dataObject).unwrap();
      setAction(false);
      setActionId("");
      setActionName("");
      navigate("/dashboard/assign");
      refetch();
      toast.success("Successfully assigned");
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }
  return (
    <div>
      {action && (
        <Modal
          title={`Are you sure want to assign ${student.name} to ${actionName} ?`}
          function1={cancelFunction}
          function2={confirmFunction}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Details</h1>
          <div className="mt-3 mb-6 bg-blue-100 p-2 md:p-6 text-sm md:text-base">
            <DetailComponent title={"NAME"} detail={student.name} />
            <DetailComponent title={"COURSE"} detail={student.course} />
            <DetailComponent title={"BRANCH"} detail={student.branch} />
            <DetailComponent title={"EMAIL"} detail={student.email} />
            <DetailComponent title={"ADDRESS"} detail={student.address} />
            <DetailComponent title={"PHONE"} detail={student.phone} />
            <DetailComponent title={"AGE"} detail={student.age} />
          </div>
          <div className="flex gap-2 justify-end text-lg">
            <Link
              to={"/dashboard/assign"}
              className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
            >
              Back
            </Link>
          </div>
        </div>
      )}
      <h1 className="text-xl md:text-2xl font-semibold">Available Teachers</h1>
      <section className=" rounded w-full bg-blue-100 pt-8 pb-12 md:pt-12 md:pb-16 px-3 md:px-8 mb-5">
        <form className="m-0 rounded-none shadow-none p-0 max-w-full w-full">
          <h4 className="form-title mb-8 text-2xl font-semibold">Search</h4>
          <div className="form-center grid gap-4">
            <FormSelectElement
              name={"Branch"}
              list={["ALL", ...Object.values(branches)]}
              defaultValue={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
        </form>
      </section>
      {teacherLoading ? (
        <Loading />
      ) : (
        <div className="mt-7 mb-5">
          {available?.length < 1 && (
            <h1 className="bg-red-800 text-white px-2 py-2">
              There are no available teachers
            </h1>
          )}
          {available?.length > 0 && (
            <table className="bg-blue-200 w-full text-center">
              <thead>
                <tr className="border-b-2 border-b-blue-300">
                  <th className=" tablecolumn">NAME</th>
                  <th className=" tablecolumn">BRANCH</th>
                  <th className=" tablecolumn">CURRENT STUDENTS</th>
                  <th className="tablecolumn">ASSIGN</th>
                </tr>
              </thead>
              <tbody>
                {available.map((x) => (
                  <tr key={x._id}>
                    <td className=" tablecolumn">{x.name}</td>
                    <td className="tablecolumn">{x.branch}</td>
                    <td className=" tablecolumn">
                      {x.teacherDetails?.currentStudents?.length}
                    </td>
                    <td className=" tablecolumn flex flex-col gap-1 justify-center items-center md:flex-row">
                      <button
                        className="bg-blue-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-blue-500 text-xs md:text-md cursor-pointer"
                        onClick={() => {
                          setAction(true);
                          setActionId(x._id);
                          setActionName(x.name);
                        }}
                      >
                        ASSIGN
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AssignToTeacherPage;
