const router = require("express").Router();
const {
  loginUser,
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", loginUser);

// Routes for admin
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", authMiddleware, createUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id", authMiddleware, updateUser);

module.exports = router;
