import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
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
import UserProfile from "./pages/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import DoctorProtectedRoute from "./components/Routes/DoctorProtectedRoute";
import AdminProtectedRoute from "./components/Routes/AdminProtectedRoute";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailedPage from "./pages/PaymentFailedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <HomePage />
      // </ProtectedRoute>
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
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
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
          <AdminProtectedRoute>
            <Users />
          </AdminProtectedRoute>
        )
      },

      {
        path: "doctors",
        element: (
          <AdminProtectedRoute>
            <Doctors />
          </AdminProtectedRoute>
        )
      },

    ]
  },
  {
    path: "doctor",
    children: [
      {
        path: "profile",
        element: (
          <DoctorProtectedRoute>
            <Profile />
          </DoctorProtectedRoute>
        )
      },
      {
        path: "book-appointment/:doctorId",
        element: (
          // <ProtectedRoute>
            <BookingPage />
          // </ProtectedRoute>
        )
      },
    ]

  },
      //  paymentSuccess
  {    
    path:"paymentSuccess",
    element:<PaymentSuccessPage/>
  },
  {
    path:"paymentFailed",
    element:<PaymentFailedPage/>
  },
  {
    path:"*",
    element:<NotFoundPage/>,
  }
]);
