import Button from "@mui/material/Button";
import React from "react";
import { useCandidateStore } from "../store/candidateStore";

function VoteButton(props) {
  const { voteCandidate } = useCandidateStore();
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
