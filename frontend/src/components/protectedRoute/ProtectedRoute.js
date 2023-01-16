import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <h1>Page Not Found</h1>;
};

export default ProtectedRoute;
