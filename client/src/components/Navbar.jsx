import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import LogoutComponent from "./LogoutComponent";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../slices/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className=" h-24 flex items-center justify-center shadow-md bg-sky-100 lg:sticky lg:top-0 z-30">
      <nav className="vw90 flex items-center justify-between lg:w-11/12">
        <button
          type="button"
          className="md:text-3xl text-xl text-blue-700 flex items-center"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-0 md:gap-3 my-0 mx-auto  lg:hidden">
            <img
              src="main.png"
              className="w-10 h-10 md:w-12 md:h-12 "
              alt="logo"
            ></img>
            <h3 className="text-blue-700 text-base md:text-2xl font-bold">
              TS Portal
            </h3>
          </div>
          <h4 className="hidden lg:block text-xl font-semibold">Dashboard</h4>
        </div>
        <div className=" flex items-center">
          <LogoutComponent />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
