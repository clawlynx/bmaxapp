import React, { useEffect, useState } from "react";
import FormElement from "./FormElement";
import FormSelectElement from "./FormSelectElement";
import { branches } from "../../../utils/constants";

import { useDispatch } from "react-redux";
import {
  setBranch,
  setCourse,
  setCurrentPage,
  setName,
  setSearchOff,
  setSearchOn,
  setTotalPages,
} from "../slices/searchSlice";

function SearchAllTeachers({ refetch }) {
  const dispatch = useDispatch();
  const courselist = ["ALL", "IELTS", "OET"];
  const [namefield, setNamefield] = useState("");
  const [branchfield, setBranchfield] = useState("ALL");
  const [coursefield, setCoursefield] = useState("ALL");

  async function handleclick(e) {
    e.preventDefault();
    dispatch(setName(namefield));
    dispatch(setCourse(coursefield));
    dispatch(setBranch(branchfield));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(1));
    dispatch(setSearchOn());
    refetch();
  }
  async function handleReset() {
    dispatch(setName(""));
    dispatch(setCourse("ALL"));
    dispatch(setBranch("ALL"));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(1));
    dispatch(setSearchOff());
    setNamefield("");
    setBranchfield("ALL");
    setCoursefield("ALL");
    refetch();
  }

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <section className=" rounded w-full bg-blue-100 pt-8 pb-12 md:pt-12 md:pb-16 px-3 md:px-8">
      <form className="m-0 rounded-none shadow-none p-0 max-w-full w-full">
        <h4 className="form-title mb-8 text-2xl font-semibold">Search</h4>
        <div className="form-center grid gap-4">
          <FormElement
            type={"text"}
            name={"Name"}
            defaultValue={namefield}
            onChange={(e) => setNamefield(e.target.value)}
          />
          <FormSelectElement
            name={"Course"}
            list={courselist}
            defaultValue={coursefield}
            onChange={(e) => setCoursefield(e.target.value)}
          />
          <FormSelectElement
            name={"Branch"}
            list={["ALL", ...Object.values(branches)]}
            defaultValue={branchfield}
            onChange={(e) => setBranchfield(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-2 py-2 hover:bg-blue-500 mt-4 text-center flex items-center justify-center"
            onClick={handleclick}
          >
            Search
          </button>
          <button
            className="bg-blue-700 text-white px-2 py-2 hover:bg-blue-500 mt-4 text-center flex items-center justify-center"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchAllTeachers;
