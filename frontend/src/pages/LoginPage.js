import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useUserAuthStore } from "../store/userAuthStore";

export default function Login() {
  const { token, user, loading, error, login, logout, checkAuth } =
    useUserAuthStore();

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const handleLogin = () => {
    const credentials = { nik, password };
    login(credentials);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8, bgcolor: "background.paper", boxShadow: 1 }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h5"
              color="text.primary"
              fontFamily="Roboto"
            >
              Masuk ke akun anda
            </Typography>
          </Grid>
          <Grid item width={"100%"}>
            <TextField
              id="nik"
              label="NIK"
              fullWidth
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </Grid>
          <Grid item width={"100%"}>
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item width={"100%"} textAlign={"center"}>
            <Button variant="contained" onClick={handleLogin}>
              Masuk
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
