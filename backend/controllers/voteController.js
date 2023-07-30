const db = require("../models");
const User = db.User;
const Candidate = db.Candidate;
require("dotenv").config();
const { contractInstance } = require("../config/blockchainConfig");
const { setUserContractInstance } = require("../utils/walletService");

const { encryptText, decryptText } = require("../utils/encryption");
const e = require("express");

// @desc    Vote candidate
// @route   POST /api/v1/vote/:id
// @access  user
exports.voteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidateExists = await Candidate.findOne({
      where: { candidateNo: id },
    });

    if (!candidateExists) {
      return res.status(400).send({
        success: false,
        message: "Please select candidate",
      });
    }

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
    });
  } catch (error) {
    if (error.message.includes("You have already voted.")) {
      return res.status(400).send({
        success: false,
        message: "You have already voted.",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }
};

// @desc    Vote candidate
// @route   POST /api/v1/vote/result
// @access  user
exports.getVoteResult = async (req, res) => {
  try {
    // const isVotingRunning = await contractInstance.getVotingStatus();
    // if (isVotingRunning)
    //   return res.status(400).send({
    //     success: false,
    //     message: "Voting is still running. Wait for it to finish",
    //   });

    const tx_users = await contractInstance.getAllVoters();
    const users = tx_users.map((user) => {
      const candidateNo = parseInt(
        user.hashedCandidateNo !== "" ? decryptText(user.hashedCandidateNo) : ""
      );
      console.log(decryptText(user.hashedCandidateNo));
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
    if (error.message.includes("Voting is already running.")) {
      return res.status(400).send({
        success: false,
        message: "Voting is already running.",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
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
      message: "Successfully stopped voting",
    });
  } catch (error) {
    if (error.message.includes("Voting is already stopped")) {
      return res.status(400).send({
        success: false,
        message: "Voting is already stopped.",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.getVotingStatus = async (req, res) => {
  try {
    const tx = await contractInstance.getVotingStatus();
    res.status(200).send({
      success: true,
      message: "Successfully fetched voting status",
      data: tx,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
