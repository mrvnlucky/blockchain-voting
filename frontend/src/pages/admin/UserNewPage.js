import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const UserNewPage = () => {
  const navigate = useNavigate();
  const { loading, error, createUser, getAllUsers } = useUserStore();
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // Add more state variables for other user details

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nik, password, verifyPassword };
    createUser(data);
    if (error) return;
    navigate("/su/users");
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
          Create new User
        </Typography>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            error={nik === ""}
            id="nik"
            label="NIK"
            fullWidth
            value={nik}
            helperText={nik === "" ? "Silahkan isi NIK User" : ""}
            onChange={(e) => setNik(e.target.value)}
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
          <Button type="submit">Submit</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserNewPage;
