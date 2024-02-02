import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import BigSideBar from "../components/BigSideBar";
import SmallSideBar from "../components/SmallSideBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/user");

      dispatch(setUser(data));
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
