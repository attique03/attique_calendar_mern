import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CalendarScreen from "./screens/CalendarScreen";
import EventCreateScreen from "./screens/EventCreateScreen";
import AppLayout from "./components/layout/AppLayout";
import AuthUserScreen from "./screens/AuthUserScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, [userInfo]);
  console.log("asdkfnsdlk ", userInfo);

  return (
    <Router>
      <Routes>
        {userInfo ? (
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<CalendarScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/createEvent" element={<EventCreateScreen />} />
          </Route>
        ) : (
          <Route path="/" element={<AuthUserScreen exact />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
