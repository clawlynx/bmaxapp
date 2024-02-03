import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllPendingVerificationQuery,
  useGetSingleTeacherQuery,
  useVerifyTeacherMutation,
} from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

function VerifySinglePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: teacher, isLoading } = useGetSingleTeacherQuery(id);
  const [verifyTeacher, { isLoading: verifyLoading }] =
    useVerifyTeacherMutation();
  const { refetch } = useGetAllPendingVerificationQuery();

  async function handleVerification(teacherId) {
    try {
      const res = await verifyTeacher(teacherId).unwrap();
      toast.success("successfully verified");
      refetch();
      navigate("/dashboard/verification");
    } catch (err) {
      toast.error(err?.data?.msg || err?.error);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Verify Teacher</h1>
      <div className="mt-3 mb-6 bg-blue-100 p-2 md:p-6 text-sm md:text-base">
        <div className="flex justify-start gap-4 md:gap-12 mb-5">
          <p>NAME</p>
          <p>:</p>
          <p>{teacher.name}</p>
        </div>
        <div className="flex justify-start gap-4 md:gap-12 mb-5">
          <p>COURSE</p>
          <p>:</p>
          <p>
            {teacher.course.includes("OET")
              ? teacher.course.substring(0, 3)
              : teacher.course.substring(0, 5)}
          </p>
        </div>
        <div className="flex justify-start gap-4 md:gap-12 mb-5">
          <p>BRANCH</p>
          <p>:</p>
          <p>{teacher.branch}</p>
        </div>
        <div className="flex justify-start gap-4 md:gap-12 mb-5">
          <p>EMAIL</p>
          <p>:</p>
          <p>{teacher.email}</p>
        </div>
        <div className="flex justify-start gap-3 md:gap-12 mb-5">
          <p>ADDRESS</p>
          <p>:</p>
          <p>{teacher.address}</p>
        </div>
        <div className="flex justify-start gap-4 md:gap-12 mb-5">
          <p>PHONE</p>
          <p>:</p>
          <p>{teacher.phone}</p>
        </div>
        <div className="flex justify-start gap-4 md:gap-12 mb-5">
          <p>AGE</p>
          <p>:</p>
          <p>{teacher.age}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end text-lg">
        <Link
          to={"/dashboard/verification"}
          className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
        >
          Back
        </Link>
        <button
          className="bg-blue-800 text-white px-2 py-1 rounded-sm hover:bg-blue-500"
          onClick={() => handleVerification(teacher._id)}
          disabled={verifyLoading}
        >
          Verify
        </button>
        {verifyLoading && <Loading />}
      </div>
    </div>
  );
}

export default VerifySinglePage;
