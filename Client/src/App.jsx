import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import homeRoutes from "./routes/homeRoutes";

import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoutes";
import storeRoutes from "./routes/storeRoutes";
import Main from "./Pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Home Page */}
        {homeRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute
                element={<Main>{route.element}</Main>}
                isProtected={route.isProtected !== false}
              />
            }
          />
        ))}
        {storeRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute
                element={<Main>{route.element}</Main>}
                isProtected={route.isProtected !== false}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
