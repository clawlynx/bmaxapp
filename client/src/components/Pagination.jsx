import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../slices/searchSlice";

function Pagination({ currentPage, totalPage, refetch }) {
  const dispatch = useDispatch();

  const prev = () => {
    if (currentPage === 1) return;
    dispatch(setCurrentPage(currentPage - 1));
    refetch();
  };
  const next = () => {
    if (currentPage === totalPage) return;
    dispatch(setCurrentPage(currentPage + 1));
    refetch();
  };

  return (
    <div className="flex items-center gap-8">
      <button
        className=" text-xl bg-blue-700 text-white p-2 rounded hover:bg-blue-500"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <GoArrowLeft />
      </button>
      <p className=" text-lg">
        Page <span className=" font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPage}</span>
      </p>
      <button
        className=" text-xl bg-blue-700 text-white p-2 rounded hover:bg-blue-500"
        onClick={next}
        disabled={currentPage === totalPage}
      >
        <GoArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
