import React from "react";
import SearchAllTeachers from "../components/SearchAllTeachers";
import AdminStudentList from "../components/AdminStudentList";

function AllStudentsAdminPage() {
  return (
    <div>
      <SearchAllTeachers />
      <AdminStudentList />
    </div>
  );
}

export default AllStudentsAdminPage;
