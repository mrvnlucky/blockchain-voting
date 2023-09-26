import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { useVoteStore } from "../store/voteStore";

function MyVotePage() {
  const { candidate, loading, error, getMyVote } = useVoteStore();
  useEffect(() => {
    getMyVote();
  }, [getMyVote]);
  return (
    <Container>
      <Typography>Pilihan Anda</Typography>
      {error ? (
        <Typography>Anda belum memilih</Typography>
      ) : (
        <>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                candidate
                  ? candidate?.data?.img
                  : "https://dummyimage.com/400.jpg"
              }
              alt="Foto kandidat"
              width={"75%"}
            />
          </Container>
          <Typography variant="h5" align="center">
            Kandidat {candidate?.data?.candidateNo}
          </Typography>
          <Typography variant="h4" align="center">
            {candidate?.data?.name}
          </Typography>
        </>
      )}
    </Container>
  );
}

export default MyVotePage;
