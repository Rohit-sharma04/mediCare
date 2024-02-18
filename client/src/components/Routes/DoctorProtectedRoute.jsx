import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function DoctorProtectedRoute({ children }) {
    const location = useLocation();
    const { user } = useSelector((state) => state.user)
    const pathSegments = location.pathname.split('/');

    // Extract the first segment (if it exists)
    const firstSegment = pathSegments.length > 1 ? pathSegments[1] : null;

    if (localStorage.getItem("token") && (firstSegment === 'doctor') && user?.isDoctor) {
        return children;

    } else {
        return <Navigate to="/login" />;
    }
}
