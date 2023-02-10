import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/register/RegisterScreen";
import EventCreateScreen from "./screens/event-create/EventCreateScreen";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import LoadingWrapper from "./components/loadingWrapper/LoadingWrapper";
import CalendarScreen from "./screens/calendar/CalendarScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <div className="d-flex">
        <div style={{ flex: "1" }}>{userInfo && <AppLayout />}</div>
        <div style={{ flex: "9" }}>
          <LoadingWrapper>
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
          </LoadingWrapper>
        </div>
      </div>
    </Router>
  );
}

export default App;
