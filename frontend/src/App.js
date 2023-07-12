import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import CandidateDash from "./pages/admin/CandidateDash";
import AdminDash from "./pages/admin/AdminDash";
import UserDash from "./pages/admin/UserDash";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/candidate/:id" element={<CandidatePage />} />
          <Route path="/hasil" element={<ResultPage />} />
          <Route path="/su/users" element={<UserDash />} />
          <Route path="/su/candidates" element={<CandidateDash />} />
          <Route path="/su/admins" element={<AdminDash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
