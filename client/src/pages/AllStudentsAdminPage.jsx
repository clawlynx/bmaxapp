import React from "react";
import SearchAllTeachers from "../components/SearchAllTeachers";
import AdminStudentList from "../components/AdminStudentList";
import { useSelector } from "react-redux";
import { useGetAllStudentsQuery } from "../slices/adminApiSlice";
import Pagination from "../components/Pagination";

function AllStudentsAdminPage() {
  const { name, branch, course, currentPage, totalPage } = useSelector(
    (state) => state.search
  );
  const { refetch } = useGetAllStudentsQuery({
    name,
    branch,
    course,
    currentPage,
    role: "student",
  });
  return (
    <div>
      <SearchAllTeachers refetch={refetch} />
      <AdminStudentList />
      {totalPage > 1 && (
        <div className=" flex justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
}

export default AllStudentsAdminPage;
