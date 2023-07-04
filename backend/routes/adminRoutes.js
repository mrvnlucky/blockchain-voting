const router = require("express").Router();
const {
  createAdmin,
  loginAdmin,
  getAllAdmins,
} = require("../controllers/adminController");

router.post("/", createAdmin);
router.post("/login", loginAdmin);
router.get("/", getAllAdmins);

module.exports = router;
