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
  }, [getAllCandidates]);

  return (
    <Container maxWidth="lg">
      <Typography>Daftar Kandidat</Typography>

      {candidates.data && candidates.data.length === 0 ? (
        <Typography>No candidates</Typography>
      ) : (
        <Grid container direction={"row"} spacing={2}>
          {candidates?.data?.map((candidate, index) => (
            <Grid item md={4} sm={6} xs={12} key={index}>
              <CandidateCard candidate={candidate} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
