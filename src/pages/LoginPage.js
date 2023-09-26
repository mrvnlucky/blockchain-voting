import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useUserAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { token, user, loading, error, login, isAuth, logout, checkAuth } =
    useUserAuthStore();

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleLogin = () => {
    const credentials = { nik, password };
    login(credentials);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 2, my: 8, bgcolor: "background.paper", boxShadow: 1 }}>
        <Typography
          component="h1"
          variant="h5"
          color="text.primary"
          fontFamily="Roboto"
          align="center"
        >
          Masuk ke akun Anda
        </Typography>

        <Box component="div" sx={{ my: 2 }}>
          <TextField
            error={error && nik === ""}
            id="nik"
            label="NIK"
            fullWidth
            value={nik}
            helperText={error && nik === "" ? "Silahkan isi NIK Anda" : ""}
            onChange={(e) => setNik(e.target.value)}
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
          <Button variant="contained" onClick={handleLogin}>
            Masuk
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
