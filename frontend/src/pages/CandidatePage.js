import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCandidateStore } from "../store/candidateStore";
import { useParams } from "react-router-dom";

export default function CandidatePage() {
  const { candidates, loading, error, getOneCandidate } = useCandidateStore();
  console.log(candidates);
  const { id } = useParams();
  useEffect(() => {
    getOneCandidate(id);
  }, [getOneCandidate]);

  const candidate = candidates[0];
  console.log(candidate);
  const missionData = candidate?.data?.mission;

  return (
    <Container maxWidth="md">
      <Grid container direction={"column"}>
        <Grid item xs alignSelf={"center"}>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                candidate
                  ? candidate?.data.img
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
          {Array.isArray(missionData) ? (
            missionData.map((missionItem, index) => (
              <Typography variant="body1" key={index}>
                {missionItem}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">
              {missionData || "No mission found."}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
