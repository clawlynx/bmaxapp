import React from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import StudentProfilePart from "../components/StudentProfilePart";
import TeacherProfilePart from "../components/TeacherProfilePart";
import AdminProfilePart from "../components/AdminProfilePart";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className=" text-9xl text-blue-800">
          <PiUserCircleThin />
        </div>
        <h1 className=" text-3xl font-bold">{userInfo?.name?.toUpperCase()}</h1>
        <p className=" font-semibold mt-2">{userInfo?.role?.toUpperCase()}</p>
      </div>
      <div className="mt-10">
        {userInfo?.role !== "admin" && (
          <div className=" flex justify-center gap-10 mb-5 text-lg font-semibold">
            <p>COURSE</p>
            <p>:</p>
            <p>
              {userInfo?.role === "student"
                ? userInfo?.course
                : userInfo?.course?.includes("OET")
                ? userInfo?.course?.substring(0, 3)
                : userInfo?.course?.substring(0, 5)}
            </p>
          </div>
        )}

        <div className=" flex justify-center gap-10 text-lg font-semibold">
          <p>BRANCH</p>
          <p>:</p>
          <p>{userInfo?.branch}</p>
        </div>
      </div>
      <div className="mt-3 bg-blue-100 p-6">
        {userInfo?.role === "student" && <StudentProfilePart />}
        {userInfo?.role === "teacher" && <TeacherProfilePart />}
        {userInfo?.role === "admin" && <AdminProfilePart />}
      </div>
    </div>
  );
}

export default ProfilePage;
