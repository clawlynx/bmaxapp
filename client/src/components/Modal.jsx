import React from "react";

function Modal({ title, function1, function2 }) {
  return (
    <aside className="modal-container">
      <div className="modal rounded">
        <h4 className="text-lg md:text-2xl font-semibold">{title}</h4>
        <div className="btn-container mt-3">
          <button
            type="button"
            className="bg-gray-700 text-white  px-1 py-1  mx-1 md:px-2 md:py-2 rounded hover:bg-gray-500 text-xs md:text-lg cursor-pointer"
            onClick={function1}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-700 text-white  px-1 py-1  mx-1 md:px-2 md:py-2 rounded hover:bg-red-500 text-xs md:text-lg cursor-pointer"
            onClick={function2}
          >
            Confirm
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal;
