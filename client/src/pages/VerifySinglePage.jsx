import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllPendingVerificationQuery,
  useGetSingleTeacherQuery,
  useVerifyTeacherMutation,
} from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import DetailComponent from "../components/DetailComponent";

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
        <DetailComponent title={"NAME"} detail={teacher.name} />
        <DetailComponent
          title={"COURSE"}
          detail={
            teacher.course.includes("OET")
              ? teacher.course.substring(0, 3)
              : teacher.course.substring(0, 5)
          }
        />
        <DetailComponent title={"BRANCH"} detail={teacher.branch} />
        <DetailComponent title={"EMAIL"} detail={teacher.email} />
        <DetailComponent title={"ADDRESS"} detail={teacher.address} />
        <DetailComponent title={"PHONE"} detail={teacher.phone} />
        <DetailComponent title={"AGE"} detail={teacher.age} />
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
