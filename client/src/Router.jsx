import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import ForgetPassword from "./pages/ForgetPasswordPage";
import OTPPage from "./pages/OTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdateProfile from "./pages/doctor/updateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    )
  },
  {
    path: "login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "forgot-password",
    element: (
      <PublicRoute>
        <ForgetPassword />
      </PublicRoute>
    )
  },
  {
    path: "forgot-password/:email",
    element: (
      <PublicRoute>
        <OTPPage />
      </PublicRoute>
    )
  },
  {
    path: ":email/reset-password",
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    )
  },
  {
    path: "register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  },
  {
    path: "appointments",
    element: (
      <ProtectedRoute>
        <Appointments />
      </ProtectedRoute>
    )
  },
  {
    path: "doctor-appointments",
    element: (
      <ProtectedRoute>
        <DoctorAppointments />
      </ProtectedRoute>
    )
  },
  {
    path: "notification",
    element: (
      <ProtectedRoute>
        <NotificationPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/apply-doctor",
    element: (
      <ProtectedRoute>
        <ApplyDoctor />
      </ProtectedRoute>
    )
  },
  //admin route can be accessed by any logged in user
  {
    path: "admin",
    children: [
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        )
      },

      {
        path: "doctors",
        element: (
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        )
      },

    ]
  },
  {
    path: "doctor",
    children: [
      {
        path: "profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: "updateProfile/:id",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        )
      },
      {
        path: "book-appointment/:doctorId",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        )
      },
    ]

  },
]);
