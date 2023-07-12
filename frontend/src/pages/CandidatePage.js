import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCandidateStore } from "../store/candidateStore";
import { useParams } from "react-router-dom";

export default function Candidate() {
  const { candidates, loading, error, getOneCandidate } = useCandidateStore();
  const { id } = useParams();
  useEffect(() => {
    getOneCandidate(id);
  }, [getOneCandidate]);
  const candidate = candidates[0];
  console.log("candidates: ", candidates);
  console.log("candidate : ", candidate?.data?.name);

  return (
    <Container maxWidth="md">
      <Grid container direction={"column"}>
        <Grid item xs alignSelf={"center"}>
          <img src="https://dummyimage.com/400.jpg" alt="Foto kandidat" />
          <Typography variant="h5" align="center">
            Kandidat {candidate?.data?.candidateNo}
          </Typography>
          <Typography variant="h4" align="center">
            {candidate?.data?.name}
          </Typography>
        </Grid>
        <Grid item></Grid>
        <Grid item xs>
          <Typography variant="h4" component={"h3"}>
            Visi
          </Typography>
          <Typography variant="body1">{candidate?.data?.vision}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component={"h3"}>
            Misi
          </Typography>
          {candidate?.data?.mission?.map((missionItem, index) => (
            <Typography variant="body1" key={index}>
              {missionItem}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
