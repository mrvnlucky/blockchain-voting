import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ResultCard(props) {
  const { candidate } = props;

  return (
    <Card
      sx={{
        maxWidth: "800px",
        width: "100%",
      }}
    >
      <CardMedia
        sx={{
          minHeight: "240px",
          // width: "100%",
        }}
        image={
          candidate && candidate.img
            ? candidate.img
            : "https://dummyimage.com/400.jpg"
        }
        title={"Foto Kandidat " + candidate.candidateNo}
        component={"img"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {candidate?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kandidat {candidate?.candidateNo}
        </Typography>
        <Typography variant="body1">
          Jumlah suara: {candidate?.voteCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`../candidates/${candidate?.id}`}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}
