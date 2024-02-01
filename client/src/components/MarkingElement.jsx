import React from "react";

function MarkingElement({
  title,
  attendanceid,
  scoreid,
  value,
  checked,
  onchange1,
  onchange2,
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 font-semibold">{title}</p>
      <div className="flex flex-col gap-3 items-start">
        <div className="mt-2 flex items-center">
          <label htmlFor={attendanceid} className=" mr-4">
            present
          </label>
          <input
            type="checkbox"
            id={attendanceid}
            checked={checked}
            className=" p-2"
            onChange={onchange1}
          ></input>
        </div>
        <div className="mt-2 flex items-center">
          <label htmlFor={scoreid} className="mr-4">
            Score
          </label>
          <input
            id={scoreid}
            type="text"
            className="p-2"
            value={value}
            onChange={onchange2}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default MarkingElement;
