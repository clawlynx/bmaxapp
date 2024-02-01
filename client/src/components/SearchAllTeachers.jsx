import React, { useState } from "react";
import FormElement from "./FormElement";
import FormSelectElement from "./FormSelectElement";
import { branches } from "../../../utils/constants";

function SearchAllTeachers() {
  const courselist = ["ALL", "IELTS", "OET"];
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  return (
    <section className=" rounded w-full bg-blue-100 pt-12 pb-16 px-8">
      <form className="m-0 rounded-none shadow-none p-0 max-w-full w-full">
        <h4 className="form-title mb-8 text-2xl font-semibold">Search</h4>
        <div className="form-center grid gap-4">
          <FormElement type={"text"} name={"Name"} />
          <FormSelectElement name={"Course"} list={courselist} />
          <FormSelectElement
            name={"Branch"}
            list={["ALL", ...Object.values(branches)]}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-2 py-2 hover:bg-blue-500 mt-4 text-center flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchAllTeachers;
