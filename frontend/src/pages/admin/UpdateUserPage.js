import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUserStore } from "../../store/userStore";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { updateUser, getOneUser, users, loading, error } = useUserStore();

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getOneUser(id);
        setNik(user?.data?.nik);
        setPassword(user?.data?.password);
        setVerifyPassword(user?.data?.password);
        // Set other form fields based on candidate data
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // Add more state variables for other user details

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nik, password, verifyPassword };
    console.log(data);
    updateUser(data);
    navigate("/su/users");
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
          Update User
        </Typography>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
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
          </FormControl>
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Verify Password
            </InputLabel>
            <OutlinedInput
              value={verifyPassword}
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

export default UpdateUserPage;
