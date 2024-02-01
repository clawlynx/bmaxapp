import React, { useState } from "react";
import MarkingElement from "../components/MarkingElement";
import { Link } from "react-router-dom";

function MarkingPage() {
  const [date, setDate] = useState("");
  const [lattendance, setLattendance] = useState(false);
  const [rattendance, setRattendance] = useState(false);
  const [wattendance, setWattendance] = useState(false);
  const [sattendance, setSattendance] = useState(false);
  const [lscore, setLScore] = useState(0);
  const [rscore, setRScore] = useState(0);
  const [wscore, setWScore] = useState(0);
  const [sscore, setSScore] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      lattendance,
      rattendance,
      wattendance,
      sattendance,
      lscore,
      rscore,
      wscore,
      sscore,
      date,
    });
  };
  return (
    <div>
      <h1 className=" text-2xl font-semibold">Evaluate</h1>
      <form className="w-full lg:w-1/3">
        <div className="mt-5">
          <p className="mb-2 font-semibold">DATE</p>
          <input
            type="date"
            className=" w-full p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <MarkingElement
          title={"LISTENING"}
          attendanceid={"lattendance"}
          scoreid={"lscore"}
          value={lscore}
          checked={lattendance}
          onchange1={(e) => setLattendance(!lattendance)}
          onchange2={(e) => setLScore(e.target.value)}
        />
        <MarkingElement
          title={"READING"}
          attendanceid={"rattendance"}
          scoreid={"rscore"}
          value={rscore}
          checked={rattendance}
          onchange1={(e) => setRattendance(!rattendance)}
          onchange2={(e) => setRScore(e.target.value)}
        />
        <MarkingElement
          title={"WRITING"}
          attendanceid={"wattendance"}
          scoreid={"wscore"}
          value={wscore}
          checked={wattendance}
          onchange1={(e) => setWattendance(!wattendance)}
          onchange2={(e) => setWScore(e.target.value)}
        />
        <MarkingElement
          title={"SPEAKING"}
          attendanceid={"sattendance"}
          scoreid={"sscore"}
          value={sscore}
          checked={sattendance}
          onchange1={(e) => setSattendance(!sattendance)}
          onchange2={(e) => setSScore(e.target.value)}
        />

        <div className="flex gap-2 justify-end text-lg">
          <Link
            to={"/dashboard/evaluate"}
            className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-800 text-white px-2 py-1 rounded-sm hover:bg-blue-500"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default MarkingPage;
