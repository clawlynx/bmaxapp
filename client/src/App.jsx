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
              path: "announcements/:id",
              element: <SingleAnnouncementPage />,
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
              element: <EvaluatePage />,
            },
            {
              path: "all-students",
              element: <AllStudentsAdminPage />,
            },
            {
              path: "all-teachers",
              element: <AllTeachersAdminPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
