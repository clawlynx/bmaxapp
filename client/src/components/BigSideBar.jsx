import React from "react";
import { useSelector } from "react-redux";
import NavLinks from "./NavLinks";

function BigSideBar() {
  const { showSidebar } = useSelector((state) => state.user);
  return (
    <aside className=" hidden lg:block ">
      <div
        className={
          showSidebar
            ? "big-sidebar-container show-big-sidebar"
            : "big-sidebar-container"
        }
      >
        <div className="sticky top-0">
          <header className="h-24 flex items-center">
            <div className="flex items-center justify-center gap-3 my-0 mx-auto mb-5">
              <img src="main.png" className=" w-12 h-12" alt="image"></img>
              <h1 className=" text-primary text-2xl font-bold">TS Portal</h1>
            </div>
          </header>
          <NavLinks />
        </div>
      </div>
    </aside>
  );
}

export default BigSideBar;
