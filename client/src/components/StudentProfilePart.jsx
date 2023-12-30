import React from "react";
import { useSelector } from "react-redux";

function StudentProfilePart() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex justify-start gap-12 mb-5">
        <p>MY TUTOR</p>
        <p>:</p>
        <p>{userInfo?.studentDetails?.teacher}</p>
      </div>
      <div className="flex justify-start gap-12 mb-5">
        <p>CLASS STARTED</p>
        <p>:</p>
        <p>
          {!userInfo?.studentDetails?.active
            ? "NOT STARTED"
            : userInfo.studentDetails.joinedOn}
        </p>
      </div>
      <div className="flex justify-start gap-12 mb-5">
        <p>CLASS ENDED</p>
        <p>:</p>
        <p>
          {!userInfo?.studentDetails?.active
            ? "NOT STARTED"
            : userInfo.studentDetails.endedOn}
        </p>
      </div>
      <div className="flex justify-start gap-12 mb-5">
        <p>TOTAL PRESENT</p>
        <p>:</p>
        <p>{}</p>
      </div>
      <div className="flex justify-start gap-12 mb-5">
        <p>TOTAL ABSENT</p>
        <p>:</p>
        <p>{}</p>
      </div>
      <div className="flex justify-start gap-12 mb-5">
        <p>AVG. PERFORMANCE</p>
        <p>:</p>
        <p>{}</p>
      </div>
    </div>
  );
}

export default StudentProfilePart;
