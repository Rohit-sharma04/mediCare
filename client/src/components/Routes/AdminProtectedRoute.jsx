import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import { useEffect } from "react";

export default function AdminProtectedRoute({ children }) {
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
      //eslint-disable-next-line
  const getUser = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        dispatchEvent(setUser(res.data.data));
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

    const pathSegments = location.pathname.split('/');
    // Extract the first segment (if it exists)
    const firstSegment = pathSegments.length > 1 ? pathSegments[1] : null;

    if (localStorage.getItem("token") && (firstSegment === 'admin') && user?.isAdmin) {
        return children;

    } else {
        return <Navigate to="/login" />;
    }
}
