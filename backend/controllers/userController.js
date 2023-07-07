const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const { ethers } = require("ethers");
const { decryptText, encryptText } = require("../utils/encryption");
const { contractInstance, signer } = require("../config/blockchainConfig");

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Admin
exports.createUser = async (req, res) => {
  try {
    const { nik, password } = req.body;
    if (!nik || !password) {
      return res.status(400).send({
        message: "Please add all required fields",
      });
    }

    // Check if user exists
    const users = await User.findAll();
    const userExists = users.find((user) => bcrypt.compareSync(nik, user.nik));
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedNik = await bcrypt.hash(nik, salt);

    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const privateKey = wallet.privateKey;
    const tx = await contractInstance.addAllowedVoter(walletAddress);
    const tx_sendEth = {
      to: walletAddress,
      value: ethers.utils.parseEther("0.001"),
    };

    const transactionSendEth = await signer.sendTransaction(tx_sendEth);

    const hashedPrivateKey = encryptText(privateKey);
    const hashedWalletAddress = encryptText(walletAddress);

    // Create user
    const user = await User.create({
      nik: hashedNik,
      password: hashedPassword,
      walletAddress: hashedWalletAddress,
      privateKey: hashedPrivateKey,
    });

    const token = generateToken({ id: user.id, role: "user" });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { token, user },
    });
  } catch (error) {
    console.error("Error during registration", error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

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

// @desc    Get all users
// @route   GET /api/v1/users
// @access   Admin
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const tx_allUsers = await contractInstance.getAllVoters();

    const tx_users = tx_allUsers.map((tx_user) => ({
      voterAddress: tx_user.voterAddress,
      isVoted: tx_user.isVoted,
      hashedCandidateNo: tx_user.hashedCandidateNo,
      isAllowed: tx_user.isAllowed,
    }));

    const users = allUsers.map((user) => ({
      id: user.id,
      nik: user.nik,
      password: user.nik,
      walletAddress: user.walletAddress,
      privateKey: user.privateKey,
    }));

    const combinedData = users.map((user) => {
      const matchingUser = tx_users.find(
        (tx_user) => tx_user.voterAddress === decryptText(user.walletAddress)
      );
      return {
        ...user,
        isVoted: matchingUser ? matchingUser.isVoted : false,
        hashedCandidateNo: matchingUser ? matchingUser.hashedCandidateNo : "",
        isAllowed: matchingUser ? matchingUser.isAllowed : false,
      };
    });

    res.status(200).json({
      success: true,
      message: "Successfully fetch all users",
      data: combinedData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get one user
// @route   GET /api/v1/users/:id
// @access   Admin
exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    res.status(200).json({
      success: true,
      message: "Successfully fetch user",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update users
// @route   PUT /api/v1/users/:id
// @access  Admin
exports.updateUser = async (req, res) => {
  try {
    const { candidateNo, name, vision, mission } = req.body;
    const { id } = req.params;
    const user = users.find((user) => bcrypt.compareSync(id, user.nik));
    // const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await User.update(
      {
        candidateNo: candidateNo,
        name: name,
        vision: vision,
        mission: mission,
      },
      { where: { hashedNik: user.hashedNik } }
    );

    res.status(200).json({
      success: true,
      message: "User successfully updated!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Admin
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found.",
      });
    }
    await user.destroy();
    // TODO: need to add contract instance for deleting the user via hashed wallet address that is later encrypted before sending to the smart contract to be removed.
    // Reason: nanti kalo hapus user jadi vote nya ikut kehapus dari smart contract. kalo ga nanti bisa terjadi dimana user yang udah keapus vote nya masih keitung.

    res.status(200).json({
      success: true,
      message: "User successfully removed.",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
