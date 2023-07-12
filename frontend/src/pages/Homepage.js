import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CandidateCard from "../components/CandidateCard";
import { useCandidateStore } from "../store/candidateStore";

export default function Homepage() {
  const { candidates, loading, error, getAllCandidates } = useCandidateStore();
  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <Container>
      <Grid container direction={"column"}>
        <Typography>Daftar Kandidat</Typography>
        <Grid container direction={"row"} spacing={3}>
          {candidates.data?.map((candidate) => (
            <Grid item md={4} sm={6} xs={12} key={candidate?.id}>
              <CandidateCard candidate={candidate} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
