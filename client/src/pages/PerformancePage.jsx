import React, { useState } from "react";

import { useSelector } from "react-redux";
import StatsContainer from "../components/StatsContainer";
import PerformanceList from "../components/PerformanceList";
import PerformanceGraph from "../components/PerformanceGraph";

function PerformancePage() {
  const { userInfo } = useSelector((state) => state.user);
  const [isGraph, setIsGraph] = useState(false);
  return (
    <div>
      <StatsContainer />
      <h1 className="text-center lg:text-3xl text-xl  mt-7 font-bold">
        Monthly Performance
      </h1>
      <div className="flex justify-center mt-5">
        {isGraph ? (
          <button
            className="bg-blue-700 text-white px-2 py-2 hover:bg-blue-500"
            onClick={() => setIsGraph(!isGraph)}
          >
            SWITCH TO LIST
          </button>
        ) : (
          <button
            className="bg-blue-700 text-white px-2 py-2 hover:bg-blue-500"
            onClick={() => setIsGraph(!isGraph)}
          >
            SWITCH TO GRAPH
          </button>
        )}
      </div>
      {isGraph ? <PerformanceGraph /> : <PerformanceList />}
    </div>
  );
}

export default PerformancePage;
