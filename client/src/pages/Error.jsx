import React from "react";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import wrong from "../assets/images/wrong.svg";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <div className=" min-h-screen text-center flex items-center justify-center">
        <div>
          <img
            src={img}
            alt="not found"
            className="vw90 max-w-2xl block mb-8 -mt-12"
          ></img>
          <h3 className=" mb-2">ohh! page not found.</h3>
          <p className=" leading-normal mt-2 mb-4 ">
            we cant find the page you are looking for
          </p>
          <Link
            className="text-primary capitalize bg-blue-700 text-white px-2 py-2"
            to={"/dashboard"}
          >
            back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen text-center flex items-center justify-center">
      <div>
        <img
          src={wrong}
          alt="wrong"
          className="vw90 max-w-2xl block mb-8 -mt-12"
        ></img>
        <h3 className=" mb-2">ohh! something went wrong</h3>
        <p className=" leading-normal mt-2 mb-4 ">
          we are unable to process your request
        </p>
        <Link
          className="text-primary capitalize bg-blue-700 text-white px-2 py-2"
          to={"/"}
        >
          back home
        </Link>
      </div>
    </div>
  );
}
