const router = require("express").Router();
const candidateController = require("../controllers/candidateController");

router.get("/", candidateController.getAllCandidates);

// Routes for admin
router.post("/", candidateController.createCandidate);
router.delete("/:id", candidateController.deleteCandidate);
router.get("/:id", candidateController.getOneCandidate);
router.put("/:id", candidateController.updateCandidate);

module.exports = router;
