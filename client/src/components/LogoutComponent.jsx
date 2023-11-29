import React, { useState } from "react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function LogoutComponent() {
  const [showLogout, setShowLogout] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className=" relative">
      <button
        type="button"
        className=" bg-blue-700 hover:bg-blue-500 rounded-md py-2 px-3 flex items-center justify-center gap-2 min-w-fit text-white"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        <p className="hidden md:block">{userInfo.name.toUpperCase()}</p>
        <FaCaretDown />
      </button>
      <div
        className={`absolute top-11 left-0 w-full shadow-md text-center rounded-md bg-blue-700 hover:bg-blue-500 ${
          showLogout ? "visible" : "invisible"
        }`}
      >
        <button type="button" className=" p-2 text-white w-full h-full">
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutComponent;
