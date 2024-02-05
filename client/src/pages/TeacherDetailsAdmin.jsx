import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleTeacherQuery } from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import DetailComponent from "../components/DetailComponent";

function TeacherDetailsAdmin() {
  const { id } = useParams();

  const { data: teacher, isLoading } = useGetSingleTeacherQuery(id);
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Details</h1>
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
          to={"/dashboard/all-teachers"}
          className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
        >
          Back
        </Link>
        <button className="bg-blue-800 text-white px-2 py-1 rounded-sm hover:bg-blue-500">
          Make Admin
        </button>
      </div>
      <h1 className="text-xl md:text-2xl font-semibold">Current Students</h1>
      <div className=" mt-7 mb-5">
        {teacher.teacherDetails?.currentStudents.length < 1 && (
          <h1 className="bg-red-800 text-white px-2 py-2">
            The teacher dont have any current students
          </h1>
        )}
        {teacher?.teacherDetails?.currentStudents.length > 0 && (
          <table className="bg-blue-200 w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-blue-300">
                <th className=" tablecolumn">NAME</th>
                <th className=" tablecolumn">START</th>
                <th className="tablecolumn">END</th>
                <th className="tablecolumn">LENGTH</th>
                <th className="tablecolumn"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" tablecolumn">p</td>
                <td className=" tablecolumn">p</td>
                <td className=" tablecolumn">p</td>
                <td className=" tablecolumn">p</td>
                <td className=" tablecolumn">p</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeacherDetailsAdmin;
