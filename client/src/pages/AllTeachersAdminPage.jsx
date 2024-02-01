import React from "react";
import SearchAllTeachers from "../components/SearchAllTeachers";
import TeacherList from "../components/TeacherList";

function AllTeachersAdminPage() {
  return (
    <div>
      <SearchAllTeachers />
      <TeacherList />
    </div>
  );
}

export default AllTeachersAdminPage;
