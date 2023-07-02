const db = require("../models");
const Admin = db.Admin;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
require("dotenv").config();

// @desc    Add new admin account
// @route   POST /api/v1/admins
// @access  Admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return es.status(400).send({
        success: false,
        message: "Please add all fields",
      });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ where: { username } });
    if (adminExists) {
      return res.status(400).send({
        success: false,
        message: "Admin already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Authenticate admin account
// @route   POST /api/v1/admins/login
// @access  Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for admin username
    const admin = await Admin.findOne({ where: { username: username } });
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.send({
        success: true,
        message: "Admin login successful",
        data: admin,
        adminToken: generateToken(admin.id),
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
};

// @desc    Get admins
// @route   GET /api/v1/admins
// @access  Public
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all admin data",
      data: admins,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};
