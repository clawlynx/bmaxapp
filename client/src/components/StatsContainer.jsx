import React from "react";
import { FaHeadphones } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa6";
import { RiSpeakFill } from "react-icons/ri";
import { FaPenRuler } from "react-icons/fa6";
import StatsItem from "../components/StatsItem";
import { useSelector } from "react-redux";

function StatsContainer() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <StatsItem icon={<FaHeadphones />} heading={"LISTENING"} />
      <StatsItem icon={<FaBookOpenReader />} heading={"READING"} />
      <StatsItem icon={<FaPenNib />} heading={"WRITING"} />
      <StatsItem icon={<RiSpeakFill />} heading={"SPEAKING"} />
      {userInfo?.course.includes("IELTS") && (
        <StatsItem icon={<FaPenRuler />} heading={"OVERALL"} />
      )}
    </div>
  );
}

export default StatsContainer;
