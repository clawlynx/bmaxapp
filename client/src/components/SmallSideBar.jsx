import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import { FaTimes } from "react-icons/fa";
import { toggleSidebar } from "../slices/userSlice";

function SmallSideBar() {
  const { showSidebar } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <aside className="block lg:hidden">
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="bg-sky-100 vw90 vh93 rounded py-16 px-8 relative flex items-center flex-col">
          <button
            type="button"
            className=" absolute top-3 left-3 text-2xl text-red-800"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <div className="flex items-center justify-center gap-3 my-0 mx-auto mb-5">
              <img src="main.png" className=" w-14 h-14" alt="image"></img>
              <h1 className=" text-primary text-3xl font-bold">TS Portal</h1>
            </div>
          </header>
          <NavLinks isSmall />
        </div>
      </div>
    </aside>
  );
}

export default SmallSideBar;
