const router = require("express").Router();
const {
  getAllCandidates,
  createCandidate,
  deleteCandidate,
  getOneCandidate,
  updateCandidate,
} = require("../controllers/candidateController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", getAllCandidates);
router.get("/:id", getOneCandidate);

// Routes for admin
router.post("/", authMiddleware, createCandidate);
router.delete("/:id", authMiddleware, deleteCandidate);
router.put("/:id", authMiddleware, updateCandidate);

module.exports = router;
