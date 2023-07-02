import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ResultCard from "../components/ResultCard";
import Typography from "@mui/material/Typography";

export default function Result() {
  return (
    <Container>
      <Grid container direction={"column"}>
        <Typography>Hasil Akhir</Typography>
        <Grid container direction={"row"}>
          <Grid item sm="12">
            <ResultCard />
          </Grid>
          <Grid item sm="4">
            <ResultCard />
          </Grid>
          <Grid item sm="4">
            <ResultCard />
          </Grid>
          <Grid item sm="4">
            <ResultCard />
          </Grid>
          <Grid item sm="4">
            <ResultCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
