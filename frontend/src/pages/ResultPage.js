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
        <Grid container direction={"row"} spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResultCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ResultCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ResultCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ResultCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ResultCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
