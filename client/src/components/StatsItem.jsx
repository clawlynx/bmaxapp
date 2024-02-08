import React from "react";

function StatsItem({ icon, heading, highscore, currentscore }) {
  return (
    <div className="flex justify-around items-center bg-blue-200 py-5 rounded-md">
      <div className="">
        <div className="text-4xl md:text-6xl inline-block">{icon}</div>
        <p className="text-xl md:text-3xl mt-3">{heading}</p>
      </div>
      <div className=" leading-loose text-sm md:text-xl">
        <p>
          Top Score : <span className=" font-semibold">{highscore}</span>
        </p>
        <p>
          Current Score : <span className=" font-semibold">{currentscore}</span>
        </p>
      </div>
    </div>
  );
}

export default StatsItem;
