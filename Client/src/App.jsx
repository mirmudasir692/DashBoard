import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home"; // Create a Home component

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Home Page */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
