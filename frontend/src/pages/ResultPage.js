import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ResultCard from "../components/ResultCard";
import Typography from "@mui/material/Typography";
import { useCandidateStore } from "../store/candidateStore";

export default function Result() {
  const { candidates, loading, error, getVoteResult } = useCandidateStore();
  useEffect(() => {
    getVoteResult();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container direction="row" spacing={2}>
        {candidates.data?.map((candidate, index) => (
          <Grid
            item
            key={index}
            {...(index === 0
              ? {
                  xs: 12,
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }
              : { md: 6, sm: 6, xs: 12 })}
          >
            <ResultCard candidate={candidate} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
