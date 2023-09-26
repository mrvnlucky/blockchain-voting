import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import VoteButton from "./VoteButton";

export default function CandidateCard(props) {
  const { candidate } = props;
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardMedia
        sx={{
          minHeight: "240px",
        }}
        image={candidate ? candidate?.img : "https://dummyimage.com/400.jpg"}
        title={"Foto kandidat " + candidate.candidateNo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component={"div"}>
          {candidate?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          Kandidat {candidate?.candidateNo}
        </Typography>
      </CardContent>
      <CardActions>
        {/* TODO: Need to add onclick function for voting */}
        {/* TODO: Need optional chaining for vote button available or not  */}
        {/* <Button size="small" component={Link} to="#">
          Vote
        </Button> */}
        <VoteButton candidateNo={candidate?.candidateNo} />
        <Button
          size="small"
          component={Link}
          to={`candidates/${candidate?.id}`}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}
