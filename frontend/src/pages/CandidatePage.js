import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Candidate() {
  return (
    <Container maxWidth="md">
      <Grid container direction={"column"}>
        <Grid item xs alignSelf={"center"}>
          <img src="https://dummyimage.com/400.jpg" alt="Foto kandidat" />
          <Typography variant="h5" align="center">
            Kandidat 1
          </Typography>
          <Typography variant="h4" align="center">
            Joko Widodo
          </Typography>
        </Grid>
        <Grid item></Grid>
        <Grid item xs>
          <Typography variant="h4" component={"h3"}>
            Visi
          </Typography>
          <Typography variant="body1">Ini adalah visiku</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component={"h3"}>
            Misi
          </Typography>
          <Typography variant="body1">1. Misi pertama</Typography>
          <Typography variant="body1">2. Misi kedua</Typography>
          <Typography variant="body1">3. Misi ketiga</Typography>
          <Typography variant="body1">4. Misi keempat</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
