import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleAnnouncementQuery } from "../slices/userApiSlice";
import Loading from "../components/Loading";

function SingleAnnouncementPage() {
  const { id } = useParams();
  const { data: announcement, isLoading } = useGetSingleAnnouncementQuery(id);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full">
      <Link
        to={"/dashboard/announcements"}
        className="bg-blue-700 px-2 py-2 rounded hover:bg-blue-500 text-white"
      >
        Go Back
      </Link>
      <h1 className="mt-7 mb-5 text-2xl">{announcement.title}</h1>
      <p className=" leading-6 max-w-xs md:max-w-full ">
        {announcement.content}
      </p>
    </div>
  );
}

export default SingleAnnouncementPage;
