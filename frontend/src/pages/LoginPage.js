import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 8,
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
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
              // value={}
              // onChange={}
            />
          </Grid>
          <Grid item width={"100%"}>
            <TextField
              id="password"
              label="Password"
              fullWidth
              // value={}
              // onChange={}
            />
          </Grid>
          <Grid item width={"100%"} textAlign={"center"}>
            <Button variant="contained">Masuk</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
