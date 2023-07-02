const db = require("../models");
const User = db.User;
const Candidate = db.Candidate;
require("dotenv").config();

const {
  provider,
  signer,
  abi,
  contractAddress,
  contractInstance,
  setUserContractInstance,
} = require("../config/blockchainConfig");
const { encryptText, decryptText } = require("../utils/encryption");

// @desc    Vote candidate
// @route   POST /api/v1/vote/:id
// @access  user
exports.voteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    const privateKey = decryptText(user.privateKey);
    const userContractInstance = setUserContractInstance(privateKey);

    const hashedCandidateNo = encryptText(id);

    console.log("privateKey: " + privateKey);
    console.log("hashedCandidateNo: " + hashedCandidateNo);

    const tx = await userContractInstance.castVote(hashedCandidateNo);
    await tx.wait();
    res.status(200).send({
      success: true,
      message: "Vote successful",
      tx_data: tx,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error occurred! " + error,
    });
  }
};

// @desc    Vote candidate
// @route   POST /api/v1/vote/result
// @access  user
exports.getResult = async (req, res) => {
  try {
    const { id } = req.params;
    const tx_users = await contractInstance.getAllVoters();
    const users = tx_users.map((user) => ({
      voterAddress: user.voterAddress,
      isVoted: user.isVoted,
      hashedCandidateNo: user.hashedCandidateNo,
      isAllowed: user.isAllowed,
      candidateNo:
        user.hashedCandidateNo !== ""
          ? decryptText(user.hashedCandidateNo)
          : "",
    }));

    res.status(200).send({
      success: true,
      message: "Vote successful",
      data: users,
      // tx_data: tx,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error occurred! " + error,
    });
  }
};

// @desc    Start voting
// @route   POST /api/v1/vote/start-vote
// @access  admin
exports.startVoting = async (req, res) => {
  try {
    const tx = await contractInstance.startVoting();
    await tx.wait();
    res.status(200).send({
      success: true,
      message: "Successfully started voting",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error occurred! " + error,
    });
  }
};

// @desc    Stop voting
// @route   POST /api/v1/stop-vote
// @access  admin
exports.stopVoting = async (req, res) => {
  try {
    const tx = await contractInstance.stopVoting();
    await tx.wait();
    res.status(200).send({
      success: true,
      message: "Successfully started voting",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error occurred! " + error,
    });
  }
};
