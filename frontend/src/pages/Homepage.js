import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CandidateCard from "../components/CandidateCard";

export default function Homepage() {
  return (
    <Container>
      <Grid container direction={"column"}>
        <Typography>Daftar Kandidat</Typography>
        <Grid container direction={"row"} spacing={3}>
          <Grid item md={4} sm={6} xs={12}>
            <CandidateCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <CandidateCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <CandidateCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <CandidateCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
