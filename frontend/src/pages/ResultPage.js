import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ResultCard from "../components/ResultCard";
import Typography from "@mui/material/Typography";
import { useVoteStore } from "../store/voteStore";

export default function ResultPage() {
  const { candidates, loading, error, getVoteResult } = useVoteStore();
  useEffect(() => {
    getVoteResult();
  }, [getVoteResult]);

  return (
    <Container maxWidth="lg">
      <Typography>Daftar hasil</Typography>
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
              : { sm: 6, xs: 12 })}
          >
            <ResultCard candidate={candidate} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
