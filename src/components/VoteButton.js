import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useVoteStore } from "../store/voteStore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useUserAuthStore } from "../store/userAuthStore";

function VoteButton(props) {
  const { voteCandidate } = useVoteStore();
  const { isAuth } = useUserAuthStore();
  const { candidateNo } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleVote = (e) => {
    e.preventDefault();
    voteCandidate(candidateNo);
    handleClose();
  };

  return (
    <>
      <Button disabled={!isAuth} size="small" onClick={handleOpen}>
        Vote
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Pilih Kandidat {candidateNo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin memilih kandidat nomor {candidateNo}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Tidak</Button>
          <Button onClick={handleVote} autoFocus>
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VoteButton;
