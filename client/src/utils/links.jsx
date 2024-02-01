import { CgProfile } from "react-icons/cg";
import { GrAnnounce } from "react-icons/gr";
import { RiPresentationLine } from "react-icons/ri";
import { TfiStatsUp } from "react-icons/tfi";
import { PiStudent } from "react-icons/pi";
import { BsBookmarks } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";

export const studentLinks = [
  { text: "profile", path: ".", icon: <CgProfile /> },
  { text: "announcements", path: "announcements", icon: <GrAnnounce /> },
  { text: "attendance", path: "attendance", icon: <RiPresentationLine /> },
  { text: "performance", path: "performance", icon: <TfiStatsUp /> },
];

export const teacherLinks = [
  { text: "profile", path: ".", icon: <CgProfile /> },
  { text: "announcements", path: "announcements", icon: <GrAnnounce /> },
  { text: "students", path: "students", icon: <PiStudent /> },
  { text: "evaluate", path: "evaluate", icon: <BsBookmarks /> },
];

export const adminLinks = [
  { text: "profile", path: ".", icon: <CgProfile /> },
  { text: "announcements", path: "announcements", icon: <GrAnnounce /> },
  { text: "all Teachers", path: "all-teachers", icon: <FaChalkboardTeacher /> },
  { text: "all Students", path: "all-students", icon: <PiStudent /> },
  {
    text: "verification",
    path: "verification",
    icon: <MdOutlineVerifiedUser />,
  },
];
