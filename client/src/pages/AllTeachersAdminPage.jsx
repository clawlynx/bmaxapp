import React from "react";
import SearchAllTeachers from "../components/SearchAllTeachers";
import TeacherList from "../components/TeacherList";
import { useParams } from "react-router-dom";
import { useGetAllTeachersQuery } from "../slices/adminApiSlice";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";

function AllTeachersAdminPage() {
  const { name, branch, course, currentPage, totalPage } = useSelector(
    (state) => state.search
  );
  const { refetch } = useGetAllTeachersQuery({
    name,
    branch,
    course,
    currentPage,
    role: "teacher",
  });
  return (
    <div>
      <SearchAllTeachers refetch={refetch} />
      <TeacherList />
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

export default AllTeachersAdminPage;
