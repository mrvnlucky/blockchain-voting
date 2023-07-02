const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/", adminController.createAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/", adminController.getAllAdmins);

module.exports = router;
