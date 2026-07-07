import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import RecentActivityPage from "../pages/RecentActivityPage";
import UpcomingDeadlinesPage from "../pages/UpcomingDeadlinesPage";
import TaskCalendarPage from "../pages/TaskCalendarPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
  path="/recent-activity"
  element={
    <ProtectedRoute>
      <RecentActivityPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/upcoming-deadlines"
  element={
    <ProtectedRoute>
      <UpcomingDeadlinesPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/task-calendar"
  element={
    <ProtectedRoute>
      <TaskCalendarPage />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;