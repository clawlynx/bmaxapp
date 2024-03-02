import React, { useState } from "react";
import { useGetUnassignedQuery } from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import FormSelectElement from "../components/FormSelectElement";
import { branches, departments } from "../../../utils/constants";
import { Link } from "react-router-dom";

function AssignAdminPage() {
  const [branch, setBranch] = useState("ALL");
  const [department, setDepartment] = useState("ALL");
  const {
    data: unassigned,
    refetch,
    isLoading,
  } = useGetUnassignedQuery({ branch, department });
  return (
    <>
      <section className=" rounded w-full bg-blue-100 pt-8 pb-12 md:pt-12 md:pb-16 px-3 md:px-8 mb-5">
        <form className="m-0 rounded-none shadow-none p-0 max-w-full w-full">
          <h4 className="form-title mb-8 text-2xl font-semibold">Search</h4>
          <div className="form-center grid gap-4">
            <FormSelectElement
              name={"Department"}
              list={["ALL", ...Object.values(departments)]}
              defaultValue={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <FormSelectElement
              name={"Branch"}
              list={["ALL", ...Object.values(branches)]}
              defaultValue={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
        </form>
      </section>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            Unassigned Students
          </h1>
          <div className="mt-7 mb-5">
            {unassigned?.length < 1 && (
              <h1 className="bg-red-800 text-white px-2 py-2">
                There are no students to assign
              </h1>
            )}
            {unassigned?.length > 0 && (
              <table className="bg-blue-200 w-full text-center">
                <thead>
                  <tr className="border-b-2 border-b-blue-300">
                    <th className=" tablecolumn">NAME</th>
                    <th className=" tablecolumn">BRANCH</th>
                    <th className=" tablecolumn">COURSE</th>
                    <th className="tablecolumn">ASSIGN</th>
                  </tr>
                </thead>
                <tbody>
                  {unassigned.map((x) => (
                    <tr key={x._id}>
                      <td className=" tablecolumn">{x.name}</td>
                      <td className="tablecolumn">{x.branch}</td>
                      <td className=" tablecolumn">{x.course}</td>
                      <td className=" tablecolumn flex flex-col gap-1 justify-center items-center md:flex-row">
                        <Link
                          to={`/dashboard/assign/${x._id}`}
                          className="bg-blue-700 text-white px-1 py-1 w-full md:w-fit mx-1 md:px-2 md:py-2 rounded hover:bg-blue-500 text-xs md:text-md cursor-pointer"
                        >
                          ASSIGN
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AssignAdminPage;
