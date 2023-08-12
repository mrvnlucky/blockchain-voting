import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCandidateStore } from "../store/candidateStore";
import { useParams } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function Candidate() {
  const { candidates, loading, error, getOneCandidate } = useCandidateStore();
  const { id } = useParams();
  useEffect(() => {
    getOneCandidate(id);
  }, [getOneCandidate]);

  const candidate = candidates[0];
  const missionData = candidate?.data?.mission;

  return (
    <Container maxWidth="md">
      <AdminSidebar />
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
