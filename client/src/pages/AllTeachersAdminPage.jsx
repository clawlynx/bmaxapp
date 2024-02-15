import React from "react";
import SearchAllTeachers from "../components/SearchAllTeachers";
import TeacherList from "../components/TeacherList";
import { useParams } from "react-router-dom";

function AllTeachersAdminPage() {
  return (
    <div>
      <SearchAllTeachers />
      <TeacherList />
    </div>
  );
}

export default AllTeachersAdminPage;
