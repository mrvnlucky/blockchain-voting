import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import CandidateDash from "./pages/admin/CandidateDash";
// import CandidateDash from "./pages/admin/CandidateDash_v2";
import AdminDash from "./pages/admin/AdminDash";
import UserDash from "./pages/admin/UserDash";
import NewAdminPage from "./pages/admin/NewAdminPage";
import NewCandidatePage from "./pages/admin/NewCandidatePage";
import UpdateCandidatePage from "./pages/admin/UpdateCandidatePage";
import NewUserPage from "./pages/admin/NewUserPage";
import UpdateUserPage from "./pages/admin/UpdateUserPage";
import UpdateAdminPage from "./pages/admin/UpdateAdminPage";
import Dropzone from "./components/admin/Dropzone";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Header />
        {/* <AdminHeader /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/candidates/:id" element={<CandidatePage />} />
          <Route path="/hasil" element={<ResultPage />} />
          <Route path="/su/users" element={<UserDash />} />
          <Route path="/su/users/add" element={<NewUserPage />} />
          <Route path="/su/users/:id" element={<UpdateUserPage />} />
          <Route path="/su/candidates" element={<CandidateDash />} />
          <Route path="/su/candidates/add" element={<NewCandidatePage />} />
          <Route path="/su/candidates/:id" element={<UpdateCandidatePage />} />
          <Route path="/su/admins" element={<AdminDash />} />
          <Route path="/su/admins/add" element={<NewAdminPage />} />
          {/* <Route path="/su/admins/:id" element={<UpdateAdminPage />} /> */}
          <Route path="/su/dropzone" element={<Dropzone />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
