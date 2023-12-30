import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AnnouncementPage() {
  const { announcements, userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-2xl mb-5 font-semibold">Announcements</h1>
      {announcements.length < 1 && (
        <div className="h-14 w-full bg-blue-200 flex items-center justify-start px-4 py-2">
          <p>There are no announcements</p>
        </div>
      )}
      <table className="bg-blue-200 w-full text-center">
        <thead>
          <tr className="border-b-2 border-b-blue-300">
            <th className=" tablecolumn">DATE</th>
            <th className=" tablecolumn">TITLE</th>
            <th className="tablecolumn">VIEW</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length > 0 &&
            announcements.map((x) => (
              <tr key={x.id}>
                <td className=" tablecolumn">{x.date}</td>
                <td className=" tablecolumn">{x.title}</td>
                <td className=" tablecolumn">
                  <Link
                    to={`/dashboard/announcements/${x.id}`}
                    className="bg-blue-700 text-white px-2 py-2 rounded hover:bg-blue-500 text-sm md:text-md cursor-pointer me-2"
                  >
                    Details
                  </Link>
                  {userInfo.role === "admin" && (
                    <>
                      <Link className="bg-gray-700 text-white px-2 py-2 rounded hover:bg-gray-500 text-sm md:text-md cursor-pointer me-2">
                        Edit
                      </Link>
                      <button className="bg-red-700 text-white px-2 py-2 rounded hover:bg-red-500 text-sm md:text-md cursor-pointer">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnnouncementPage;
