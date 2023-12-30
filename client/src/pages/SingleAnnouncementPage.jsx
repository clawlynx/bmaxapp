import React from "react";
import { Link } from "react-router-dom";

function SingleAnnouncementPage() {
  return (
    <div>
      <Link
        to={"/dashboard/announcements"}
        className="bg-blue-700 px-2 py-2 rounded hover:bg-blue-500 text-white"
      >
        Go Back
      </Link>
      <h1 className="mt-7 mb-5 text-2xl">Title</h1>
      <p className=" leading-6">
        lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
        l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;l;
        l;dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      </p>
    </div>
  );
}

export default SingleAnnouncementPage;
