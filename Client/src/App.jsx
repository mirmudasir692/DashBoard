import { useState } from 'react'
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css'

function App() {

  return (
    <>
     <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
