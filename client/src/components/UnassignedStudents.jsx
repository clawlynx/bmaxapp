import React from "react";

function UnassignedStudents() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Unassigned Students</h1>
      <div className="mt-7 mb-5">
        <table className="bg-blue-200 w-full text-center">
          <thead>
            <tr className="border-b-2 border-b-blue-300">
              <th className=" tablecolumn">NAME</th>
              <th className=" tablecolumn">LENGTH</th>
              <th className="tablecolumn">ADD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" tablecolumn">p</td>
              <td className=" tablecolumn">p</td>
              <td className=" tablecolumn">p</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnassignedStudents;
