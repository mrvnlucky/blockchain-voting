const router = require("express").Router();
const {
  voteCandidate,
  startVoting,
  stopVoting,
  getVoteResult,
} = require("../controllers/voteController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/cast/:id", authMiddleware, voteCandidate);
router.post("/start", authMiddleware, startVoting);
router.post("/stop", authMiddleware, stopVoting);
router.get("/result", getVoteResult);

module.exports = router;
