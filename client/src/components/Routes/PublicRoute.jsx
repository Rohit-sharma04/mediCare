import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  //if you have token can't go to login or signup page
  if (localStorage.getItem("token")) {
    return <Navigate to="/"/>;
  } else {
    return children;
  }
}
