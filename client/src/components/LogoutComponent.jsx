import React, { useState } from "react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";
import { toast } from "react-toastify";

function LogoutComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(setUser(null));
      navigate("/");
      toast.success("successfully logged out");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.msg || err?.error);
    }
  }
  return (
    <div className=" relative">
      <button
        type="button"
        className=" bg-blue-700 hover:bg-blue-500 rounded-md py-2 px-3 flex items-center justify-center gap-2 min-w-fit text-white"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        <p className="hidden md:block">{userInfo?.name?.toUpperCase()}</p>
        <FaCaretDown />
      </button>
      <div
        className={`absolute top-11 left-0 w-full shadow-md text-center rounded-md bg-blue-700 hover:bg-blue-500 ${
          showLogout ? "visible" : "invisible"
        }`}
      >
        <button
          type="button"
          className=" p-2 text-white w-full h-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutComponent;
