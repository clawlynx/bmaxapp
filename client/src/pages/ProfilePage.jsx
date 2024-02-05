import React from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import StudentProfilePart from "../components/StudentProfilePart";
import TeacherProfilePart from "../components/TeacherProfilePart";
import AdminProfilePart from "../components/AdminProfilePart";
import { Link } from "react-router-dom";
import DetailComponent from "../components/DetailComponent";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-5xl md:text-9xl text-blue-800">
          <PiUserCircleThin />
        </div>
        <h1 className="text-xl md:text-3xl font-bold">
          {userInfo?.name?.toUpperCase()}
        </h1>
        <p className=" font-semibold mt-2">{userInfo?.role?.toUpperCase()}</p>
      </div>
      <div className="mt-10">
        {userInfo?.role !== "admin" && (
          <div className=" flex justify-center gap-4 md:gap-10 mb-5 text-base md:text-lg font-semibold">
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

        <div className=" flex justify-center gap-4 md:gap-10 text-base md:text-lg font-semibold">
          <p>BRANCH</p>
          <p>:</p>
          <p>{userInfo?.branch}</p>
        </div>
      </div>
      <div className="mt-3 mb-6 bg-blue-100 p-2 md:p-6 text-sm md:text-base">
        <DetailComponent title={"EMAIL"} detail={userInfo?.email} />
        <DetailComponent title={"ADDRESS"} detail={userInfo?.address} />
        <DetailComponent title={"PHONE"} detail={userInfo?.phone} />
        <DetailComponent title={"AGE"} detail={userInfo?.age} />
        {userInfo?.role === "student" && <StudentProfilePart />}
        {userInfo?.role === "teacher" && <TeacherProfilePart />}
        {userInfo?.role === "admin" && <AdminProfilePart />}
      </div>
      <Link
        to={"/dashboard/profile/edit"}
        className=" bg-blue-700 text-white px-2 py-2 rounded-md hover:bg-blue-500"
      >
        Edit Profile
      </Link>
    </div>
  );
}

export default ProfilePage;
