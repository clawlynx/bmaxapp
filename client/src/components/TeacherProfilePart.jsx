import React from "react";
import { useSelector } from "react-redux";

function TeacherProfilePart() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>VERIFICATION</p>
        <p>:</p>
        <p>
          {userInfo?.teacherDetails?.hasVerified ? (
            <span className=" bg-green-600 px-2 py-1">VERIFIED</span>
          ) : (
            <span className=" bg-red-600 px-2 py-1">NOT VERIFIED</span>
          )}
        </p>
      </div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>CURRENT STUDENTS</p>
        <p>:</p>
        <p>
          {userInfo?.teacherDetails?.hasVerified ? (
            <span>{userInfo.teacherDetails.currentStudents.length}</span>
          ) : (
            <span>N/A</span>
          )}
        </p>
      </div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>COMPLETED STUDENTS</p>
        <p>:</p>
        <p>
          {userInfo?.teacherDetails?.hasVerified ? (
            <span>{userInfo.teacherDetails.completedStudents.length}</span>
          ) : (
            <span className=" ">N/A</span>
          )}
        </p>
      </div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>JOINED ON</p>
        <p>:</p>
        <p>
          {userInfo?.teacherDetails?.hasVerified ? (
            <span>
              {userInfo?.teacherDetails?.verifiedOn.substring(0, 10) || "nill"}
            </span>
          ) : (
            <span className=" bg-red-600 px-2 py-1">NOT VERIFIED</span>
          )}
        </p>
      </div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>STATUS</p>
        <p>:</p>
        <p>{userInfo?.teacherDetails?.status || "INACTIVE"}</p>
      </div>
    </div>
  );
}

export default TeacherProfilePart;
