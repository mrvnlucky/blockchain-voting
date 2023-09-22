import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAdminStore } from "../../store/adminStore";
import { useNavigate } from "react-router-dom";

const AdminNewPage = () => {
  const navigate = useNavigate();
  const { createAdmin } = useAdminStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // Add more state variables for other user details

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password, verifyPassword };
    console.log(data);
    createAdmin(data);
    navigate("/su/admins");
    // Handle form submission logic here
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 1,
          p: 2,
        }}
      >
        <Typography
          component={"h1"}
          variant="h5"
          color="text.primary"
          fontFamily="Roboto"
          align="center"
        >
          Create new Admin
        </Typography>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="Username"
            error={username === ""}
            helperText={username === "" ? "Silahkan isi nomor kandidat" : ""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={password === ""}
              value={password}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {password === "" && (
              <FormHelperText error>Silahkan isi password User</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Verify Password
            </InputLabel>
            <OutlinedInput
              value={verifyPassword}
              error={verifyPassword === ""}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setVerifyPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {verifyPassword === "" && (
              <FormHelperText error>
                Silahkan isi ulang password User
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" sx={{ justifyContent: "centers" }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminNewPage;
