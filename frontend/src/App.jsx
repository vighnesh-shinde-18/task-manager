import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/loginAndRegistration/Register";
import Login from "../components/loginAndRegistration/Login";
import TaskManager from "../components/TaskManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/TaskManager" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
