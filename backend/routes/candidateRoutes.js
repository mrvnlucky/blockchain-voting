const router = require("express").Router();
const {
  getAllCandidates,
  createCandidate,
  deleteCandidate,
  getOneCandidate,
  updateCandidate,
} = require("../controllers/candidateController");
const { adminAuthMiddleware } = require("../middleware/authMiddleware");

router.get("/", getAllCandidates);
router.get("/:id", getOneCandidate);

// Routes for admin
router.post("/", adminAuthMiddleware, createCandidate);
router.delete("/:id", adminAuthMiddleware, deleteCandidate);
router.put("/:id", adminAuthMiddleware, updateCandidate);

module.exports = router;
