import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CalendarScreen from "./screens/CalendarScreen";
import EventCreateScreen from "./screens/EventCreateScreen";
import EventsScreen from "./screens/EventsScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/createEvent" element={<EventCreateScreen />} />
        <Route path="/events" element={<EventsScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
