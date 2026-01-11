import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Progress from "./pages/Progress";


function App() {

  const isLoggedIn = () => !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Login />} />
      <Route path="/topics" element={isLoggedIn() ? <Topics /> : <Login />} />
      <Route path="/progress" element={isLoggedIn() ? <Progress /> : <Login />} />

    </Routes>
  );
}

export default App;
