import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import { CssBaseline } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import CandidateDash from "./pages/admin/CandidateDash";
import AdminDash from "./pages/admin/AdminDash";
import UserDash from "./pages/admin/UserDash";
import AdminNewPage from "./pages/admin/AdminNewPage";
import CandidateNewPage from "./pages/admin/CandidateNewPage";
import CandidateUpdatePage from "./pages/admin/CandidateUpdatePage";
import UserNewPage from "./pages/admin/UserNewPage";
import UserUpdatePage from "./pages/admin/UserUpdatePage";
import AdminUpdatePage from "./pages/admin/AdminUpdatePage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import NormalLayout from "./layouts/NormalLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NormalLayout>
                <HomePage />
              </NormalLayout>
            }
          />
          <Route
            path="/login"
            element={
              <NormalLayout>
                <LoginPage />
              </NormalLayout>
            }
          />
          <Route
            path="/candidates/:id"
            element={
              <NormalLayout>
                <CandidatePage />
              </NormalLayout>
            }
          />
          <Route
            path="/hasil"
            element={
              <NormalLayout>
                <ResultPage />
              </NormalLayout>
            }
          />
          <Route path="/su/login" element={<AdminLoginPage />} />
          <Route
            path="/su/users"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <UserDash />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/users/add"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <UserNewPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/users/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <UserUpdatePage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/candidates"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CandidateDash />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/candidates/add"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CandidateNewPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/candidates/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CandidateUpdatePage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/admins"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDash />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/admins/add"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminNewPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/su/admins/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminUpdatePage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
