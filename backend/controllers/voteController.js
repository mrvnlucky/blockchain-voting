const db = require("../models");
const User = db.User;
const Candidate = db.Candidate;
require("dotenv").config();
const {
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
      where: { id: req.user.data.id },
    });
    const privateKey = decryptText(user.privateKey);
    const userContractInstance = setUserContractInstance(privateKey);

    const hashedCandidateNo = encryptText(id);

    const tx = await userContractInstance.castVote(hashedCandidateNo);
    await tx.wait();
    res.status(200).send({
      success: true,
      message: "Vote successful",
      tx_data: tx,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message.message,
    });
  }
};

// @desc    Vote candidate
// @route   POST /api/v1/vote/result
// @access  user
exports.getVoteResult = async (req, res) => {
  try {
    // TODO: add if condition buat check votingStatus

    const tx_users = await contractInstance.getAllVoters();
    const users = tx_users.map((user) => {
      const candidateNo = parseInt(
        user.hashedCandidateNo !== "" ? decryptText(user.hashedCandidateNo) : ""
      );
      return {
        voterAddress: user.voterAddress,
        isVoted: user.isVoted,
        hashedCandidateNo: user.hashedCandidateNo,
        isAllowed: user.isAllowed,
        candidateNo: candidateNo,
      };
    });

    const allCandidates = await Candidate.findAll();

    const candidates = allCandidates.map((candidate) => {
      const voteCount = users.filter(
        (user) => user.candidateNo === candidate.candidateNo
      ).length;
      return {
        id: candidate.id,
        candidateNo: candidate.candidateNo,
        name: candidate.name,
        vision: candidate.vision,
        mission: candidate.mission,
        voteCount: voteCount,
      };
    });

    const sortedCandidates = candidates.sort(
      (a, b) => b.voteCount - a.voteCount
    );

    res.status(200).send({
      success: true,
      message: "Fetched vote result successfully",
      data: sortedCandidates,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
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
    return res.status(400).send({
      success: false,
      message: error.message,
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
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getVotingStatus = async (req, res) => {
  try {
    const tx = await contractInstance.getVotingStatus();
    await tx.wait();
    res.status(200).send({
      success: true,
      message: "Succesfully fetched voting status",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
