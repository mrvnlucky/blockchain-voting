const router = require("express").Router();

const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const candidateRoutes = require("./candidateRoutes");
const voteRoutes = require("./voteRoutes");

router.use("/users", userRoutes);
router.use("/admins", adminRoutes);
router.use("/candidates", candidateRoutes);
router.use("/vote", voteRoutes);

module.exports = router;
