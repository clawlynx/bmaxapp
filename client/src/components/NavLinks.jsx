import React from "react";
import { adminLinks, studentLinks, teacherLinks } from "../utils/links";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../slices/userSlice";

function NavLinks({ isSmall }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname.toString();

  const { userInfo } = useSelector((state) => state.user);
  function toggle() {
    dispatch(toggleSidebar());
  }
  return (
    <div className="pt-8 flex flex-col">
      {userInfo?.role === "student" &&
        studentLinks.map((item) => {
          const { text, path } = item;
          return (
            <NavLink
              to={path}
              key={text}
              className={`nav-link flex items-center gap-2 py-4 lg:ps-10 px-0 capitalize hover:text-blue-700 hover:ms-5 ${
                pathname.includes(text) ? "text-blue-700" : ""
              }`}
              onClick={isSmall && toggle}
              end
            >
              <span className="lg:text-2xl lg:me-4">{item.icon}</span>
              {text}
            </NavLink>
          );
        })}
      {userInfo?.role === "admin" &&
        adminLinks.map((item) => {
          const { text, path, urlword } = item;
          return (
            <NavLink
              to={path}
              key={text}
              className={`nav-link flex items-center gap-2 py-4 lg:ps-10 px-0 capitalize hover:text-blue-700 hover:ms-5 ${
                pathname.includes(urlword) ? "text-blue-700" : ""
              }`}
              onClick={isSmall && toggle}
              end
            >
              <span className="lg:text-2xl lg:me-4">{item.icon}</span>
              {text}
            </NavLink>
          );
        })}
      {userInfo?.role === "teacher" &&
        teacherLinks.map((item) => {
          const { text, path } = item;
          return (
            <NavLink
              to={path}
              key={text}
              className={`nav-link flex items-center gap-2 py-4 lg:ps-10 px-0 capitalize hover:text-blue-700 hover:ms-5 ${
                pathname.includes(text) ? "text-blue-700" : ""
              }`}
              onClick={isSmall && toggle}
              end
            >
              <span className="lg:text-2xl lg:me-4">{item.icon}</span>
              {text}
            </NavLink>
          );
        })}
    </div>
  );
}

export default NavLinks;
