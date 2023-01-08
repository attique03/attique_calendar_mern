import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CalendarScreen from "./screens/CalendarScreen";
import EventCreateScreen from "./screens/EventCreateScreen";
import EventsScreen from "./screens/EventsScreen";
import AppLayout from "./components/layout/AppLayout";
import AuthUserScreen from "./screens/AuthUserScreen";
import Users from "./screens/Users";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Routes>
        {userInfo ? (
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<CalendarScreen />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/createEvent" element={<EventCreateScreen />} />
            <Route path="/events" element={<EventsScreen />} />
          </Route>
        ) : (
          <Route path="/" element={<AuthUserScreen />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
