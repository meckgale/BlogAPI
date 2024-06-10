import { useContext } from "react";
import { Navigate } from "react-router-dom"; // Make sure you've installed react-router-dom
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
