import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: "360px" }}>
      <CardMedia
        sx={{ height: "240px" }}
        image="https://dummyimage.com/400.jpg"
        title="Foto kandidat 1"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Joko Widodo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kandidat 1
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Vote</Button>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}
