import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Candidate() {
  const [candidate, setCandidate] = useState([]);
  const { id } = useParams();
  async function getCandidate(_id) {
    axios
      .get(`${BASE_URL}/candidates/` + _id)
      .then((response) => {
        setCandidate(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCandidate(id);
  }, []);

  console.log(candidate);
  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {candidate.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Vote Count: {candidate.voteCount}
            </Typography>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}

export default Candidate;
