const router = require("express").Router();
const { createAdmin, getAllAdmins } = require("../controllers/adminController");

router.post("/", createAdmin);
router.get("/", getAllAdmins);

module.exports = router;
