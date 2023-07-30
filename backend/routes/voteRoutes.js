const router = require("express").Router();
const {
  voteCandidate,
  startVoting,
  stopVoting,
  getVoteResult,
  getVotingStatus,
} = require("../controllers/voteController");
const {
  authMiddleware,
  adminAuthMiddleware,
} = require("../middleware/authMiddleware");

router.post("/cast/:id", authMiddleware, voteCandidate);
router.post("/start", adminAuthMiddleware, startVoting);
router.post("/stop", adminAuthMiddleware, stopVoting);
router.get("/result", getVoteResult);
router.get("/", getVotingStatus);

module.exports = router;
