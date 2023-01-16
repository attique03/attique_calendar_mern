import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CalendarScreen from "./screens/CalendarScreen";
import EventCreateScreen from "./screens/EventCreateScreen";
import AppLayout from "./components/layout/AppLayout";
import AuthUserScreen from "./screens/AuthUserScreen";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      {userInfo && <AppLayout />}

      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <CalendarScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createEvent"
          exact
          element={
            <ProtectedRoute>
              <EventCreateScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
