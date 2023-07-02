const router = require("express").Router();
const voteController = require("../controllers/voteController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/cast/:id", authMiddleware, voteController.voteCandidate);
router.post("/start", authMiddleware, voteController.startVoting);
router.post("/stop", authMiddleware, voteController.stopVoting);
router.get("/result", voteController.getResult);

module.exports = router;
