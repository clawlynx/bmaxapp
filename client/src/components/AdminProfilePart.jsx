import React from "react";
import { useGetSummaryQuery } from "../slices/adminApiSlice";
import Loading from "./Loading";

function AdminProfilePart() {
  const { data: summary, isLoading } = useGetSummaryQuery();
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="flex justify-start gap-12 mb-5">
        <p>TOTAL STUDENTS</p>
        <p>:</p>
        <p>{summary.totalStudents}</p>
      </div>
      <div className="flex justify-start gap-12 mb-5">
        <p>TOTAL TEACHERS</p>
        <p>:</p>
        <p>{summary.totalTeachers}</p>
      </div>
    </div>
  );
}

export default AdminProfilePart;
