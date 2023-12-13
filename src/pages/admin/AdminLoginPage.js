import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const { error, login, isAuth, checkAuth } = useAdminAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (isAuth) {
      navigate("/su/candidates");
    }
  }, [isAuth, navigate]);

  const handleLogin = () => {
    const credentials = { username, password };
    login(credentials);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Box sx={{ p: 2, my: 8, bgcolor: "background.paper", boxShadow: 1 }}>
          <Typography
            component="h1"
            variant="h5"
            color="text.primary"
            fontFamily="Roboto"
            align="center"
          >
            Admin Login
          </Typography>

          <Box component="div" sx={{ my: 2 }}>
            <TextField
              error={error && username === ""}
              id="username"
              label="Username"
              fullWidth
              value={username}
              helperText={
                error && username === "" ? "Silahkan isi username Anda" : ""
              }
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          <Box component="div" sx={{ my: 2 }}>
            <TextField
              error={error && password === ""}
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              helperText={
                error && password === "" ? "Silahkan isi password Anda" : ""
              }
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit">
              Masuk
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
}
