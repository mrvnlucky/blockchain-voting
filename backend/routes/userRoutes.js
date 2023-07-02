const router = require("express").Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", userController.loginUser);

// Routes for admin
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.post("/", authMiddleware, userController.createUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.put("/:id", authMiddleware, userController.updateUser);

module.exports = router;
