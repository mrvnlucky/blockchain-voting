import Button from "@mui/material/Button";
import React from "react";
import { useVoteStore } from "../store/voteStore";

function VoteButton(props) {
  const { voteCandidate } = useVoteStore();
  const { candidateNo } = props;

  const handleVote = (e) => {
    e.preventDefault();
    voteCandidate(candidateNo);
  };

  return (
    <Button size="small" onClick={handleVote}>
      Vote
    </Button>
  );
}

export default VoteButton;
