import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import BigSideBar from "../components/BigSideBar";
import SmallSideBar from "../components/SmallSideBar";

function DashboardLayout() {
  return (
    <div>
      <main className="grid grid-cols-1 dashboardlayout">
        <BigSideBar />
        <SmallSideBar />
        <div>
          <Navbar />
          <div className="vw90 my-0 mx-auto py-8 px-0 lg:w-11/12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
