import React from "react";
import { useSelector } from "react-redux";
import CurrentStudentsView from "../components/CurrentStudentsView";
import CompletedStudents from "../components/CompletedStudents";
import UnassignedStudents from "../components/UnassignedStudents";

function StudentsTeacherPage() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      {!userInfo?.teacherDetails?.hasVerified ? (
        <h1 className="bg-red-800 text-white px-2 py-2">
          Your Profile is not verified. You will be able to access this page
          only after verification
        </h1>
      ) : (
        <div>
          <CurrentStudentsView />
          <UnassignedStudents />
          <CompletedStudents />
        </div>
      )}
    </div>
  );
}

export default StudentsTeacherPage;
