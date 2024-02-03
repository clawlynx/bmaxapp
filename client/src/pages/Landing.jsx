import React from "react";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className=" p-7 max-w-6xl mx-auto">
      <div className="flex items-center justify-start gap-3 h-24">
        <img
          className="w-14 h-14 md:w-16 md:h-16"
          src="/main.png"
          alt="logo"
        ></img>
        <h1 className="text-2xl md:text-4xl font-semibold">Bemax TS Portal</h1>
      </div>
      <div className=" grid lg:grid-cols-2 max-w-6xl landingPage mt-10 md:mt-24">
        <div>
          <h1 className=" text-blue-700 font-semibold text-2xl md:text-4xl mb-2">
            Welcome!!{" "}
          </h1>
          <h2 className="mb-2  text-xl md:text-3xl">
            the <span>Teachers-Students</span> Portal
          </h2>
          <p className=" leading-7 mb-8 text-sm md:text-lg">
            This is a portal for our students for evaluating their performance
            and following their attendance. Students are able to continuously
            follow their performance in each module and has a chance to improve
            in what is weak. Teachers are able to mark their attendance and
            evaluate each student
          </p>
          <Link
            to={"/register"}
            className=" px-4 py-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 rounded-md me-2"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className=" px-4 py-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 rounded-md"
          >
            Login
          </Link>
        </div>
        <img
          src={main}
          alt="image"
          className="hidden w-full object-cover lg:block"
        ></img>
      </div>
    </div>
  );
}

export default Landing;
