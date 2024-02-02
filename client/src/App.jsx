import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import HomeLayout from "./pages/HomeLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import AnnouncementPage from "./pages/AnnouncementPage";
import AttendancePage from "./pages/AttendancePage";
import PerformancePage from "./pages/PerformancePage";
import StudentsTeacherPage from "./pages/StudentsTeacherPage";
import EvaluatePage from "./pages/EvaluatePage";
import AllStudentsAdminPage from "./pages/AllStudentsAdminPage";
import AllTeachersAdminPage from "./pages/AllTeachersAdminPage";
import Error from "./pages/Error";
import SingleAnnouncementPage from "./pages/SingleAnnouncementPage";
import EditProfilePage from "./pages/EditProfilePage";
import MarkingPage from "./pages/MarkingPage";
import VerificationPage from "./pages/VerificationPage";
import NewAnnouncement from "./pages/NewAnnouncement";
import EditAnnouncement from "./pages/EditAnnouncement";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <ProfilePage />,
            },
            {
              path: "announcements",
              element: <AnnouncementPage />,
            },
            {
              path: "announcements/new",
              element: <NewAnnouncement />,
            },
            {
              path: "announcements/:id",
              element: <SingleAnnouncementPage />,
            },
            {
              path: "announcements/edit/:id",
              element: <EditAnnouncement />,
            },
            {
              path: "attendance",
              element: <AttendancePage />,
            },
            {
              path: "performance",
              element: <PerformancePage />,
            },
            {
              path: "students",
              element: <StudentsTeacherPage />,
            },
            {
              path: "evaluate",
              children: [
                {
                  index: true,
                  element: <EvaluatePage />,
                },
                {
                  path: "mark/:id",
                  element: <MarkingPage />,
                },
              ],
            },

            {
              path: "all-students",
              element: <AllStudentsAdminPage />,
            },
            {
              path: "all-teachers",
              element: <AllTeachersAdminPage />,
            },
            {
              path: "verification",
              element: <VerificationPage />,
            },
            {
              path: "profile/edit",
              element: <EditProfilePage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
