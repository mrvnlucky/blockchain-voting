import * as React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

import { useStatusStore } from "../../store/statusStore";

export default function AdminDash() {
  const { status, error, loading, startVote, stopVote, getStatus } =
    useStatusStore();

  useEffect(() => {
    getStatus();
  }, []);

  const handleGetStatus = () => {
    getStatus();
  };
  const handleStartVote = () => {
    startVote();
  };

  const handleStopVote = () => {
    stopVote();
  };

  return (
    <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
      <Typography>Status Pengambilan Suara</Typography>
      {/* <Button onClick={handleGetStatus}>Get Status</Button> */}
      <Typography>
        Stop
        {status ? (
          <Switch checked onChange={handleStopVote} />
        ) : (
          <Switch checked={false} onChange={handleStartVote} />
        )}
        Start
      </Typography>
    </Box>
  );
}
