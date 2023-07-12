const db = require("../models");
const User = db.User;
const Admin = db.Admin;
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { nik, password } = req.body;
    // Check for user nik
    const users = await User.findAll();
    const user = users.find((user) => bcrypt.compareSync(nik, user.nik));
    // const user = await User.findOne({ where: { nik: nik } });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken({ id: user.id, role: "user" });

    res.status(200).send({
      success: true,
      message: "Login successful",
      data: { token, user },
    });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.checkUserAuth = async (req, res) => {
  try {
    const userId = req.user.data.id;
    const user = await User.findOne({ where: { id: userId } });
    res.status(200).json({
      success: true,
      message: "User authorized",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "User unauthorized",
    });
  }
};

// @desc    Authenticate admin account
// @route   POST /api/v1/admins/login
// @access  Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Please add all required fields",
      });
    }

    // Check for admin username
    const admin = await Admin.findOne({ where: { username: username } });
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({ id: admin.id, role: "admin" });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.send({
        success: true,
        message: "Admin login successful",
        data: { token, admin },
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

exports.checkAdminAuth = async (req, res) => {
  try {
    const adminId = req.user.data.id;

    console.log(adminId);
    console.log(req.user.data.id);
    const admin = await Admin.findOne({ where: { id: adminId } });
    res.status(200).json({
      success: true,
      message: "Authorized",
      data: admin,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Admin credentials unauthorized",
    });
  }
};
