import React from "react";

function DetailComponent({ title, detail }) {
  return (
    <div className="flex justify-start gap-4 md:gap-12 mb-5">
      <p>{title}</p>
      <p>:</p>
      <p>{detail}</p>
    </div>
  );
}

export default DetailComponent;
