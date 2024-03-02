import React from "react";
import { useSelector } from "react-redux";

function StudentProfilePart() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>MY TUTOR</p>
        <p>:</p>
        <p>{userInfo?.studentDetails?.teacher}</p>
      </div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>CLASS STARTED</p>
        <p>:</p>
        <p>
          {!userInfo?.studentDetails?.joinedOn
            ? "NOT STARTED"
            : userInfo.studentDetails.joinedOn.substring(0, 10)}
        </p>
      </div>
      <div className="flex justify-start gap-4 md:gap-12 mb-5">
        <p>CLASS ENDED</p>
        <p>:</p>
        <p>
          {!userInfo?.studentDetails?.endedOn
            ? "N/A"
            : userInfo.studentDetails.endedOn.substring(0, 10)}
        </p>
      </div>
    </div>
  );
}

export default StudentProfilePart;
