const db = require("../models");
const Candidate = db.Candidate;
const {
  provider,
  signer,
  abi,
  contractAddress,
  contractInstance,
} = require("../config/blockchainConfig");

// @desc    Add candidate
// @route   POST /api/v1/candidates
// @access  admin
exports.createCandidate = async (req, res) => {
  try {
    const { candidateNo, name, vision, mission } = req.body;

    // TODO: save id, vision, mission to candidate
    const candidate = await Candidate.create({
      candidateNo: candidateNo,
      name: name,
      vision: vision,
      mission: mission,
    });

    // // save name to smart contract
    // const tx = await contractInstance.addCandidate(name);
    // await tx.wait();

    res.status(201).send({
      success: true,
      message: "Candidate successfully created",
      data: candidate,
      // tx_data: tx,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

// @desc    Get candidates
// @route   GET /api/v1/candidates
// @access  admin
exports.getAllCandidates = async (req, res) => {
  try {
    // const tx_allCandidates = await contractInstance.getAllCandidates();
    const allCandidates = await Candidate.findAll();

    // const tx_candidates = tx_allCandidates.map((tx_candidate) => ({
    //   id: parseInt(tx_candidate.id),
    //   name: tx_candidate.name,
    //   voteCount: parseInt(tx_candidate.voteCount),
    // }));

    // const candidates = allCandidates.map((candidate) => ({
    //   candidateId: candidate.candidateId,
    //   vision: candidate.vision,
    //   mission: candidate.mission,
    // }));

    // const combinedData = candidates.map((candidate) => {
    //   const matchingCandidate = tx_candidates.find(
    //     (tx_candidate) => tx_candidate.id === candidate.candidateId
    //   );
    //   return {
    //     ...candidate,
    //     voteCount: matchingCandidate ? matchingCandidate.voteCount : 0,
    //     name: matchingCandidate ? matchingCandidate.name : "",
    //   };
    // });

    const candidates = allCandidates.map((candidate) => ({
      candidateNo: candidate.candidateNo,
      name: candidate.name,
      vision: candidate.vision,
      mission: candidate.mission,
    }));

    res.status(200).send({
      success: true,
      message: "Successfully fetched all candidates data",
      data: candidates,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occurred!" + error,
    });
  }
};

// @desc    Get one candidate
// @route   GET /api/v1/candidates/:id
// @access  admin
exports.getOneCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    // const tx_candidate = await contractInstance.getOneCandidate(id);
    // parsedCandidate = {
    //   id: parseInt(tx_candidate[0]),
    //   name: tx_candidate[1],
    //   voteCount: parseInt(tx_candidate[2]),
    // };
    const candidate = await Candidate.findOne({ where: { id: id } });

    // const combinedData = {
    //   ...parsedCandidate,
    //   ...candidate,
    // };

    res.status(200).send({
      success: true,
      message: "Successfully fetched candidate data",
      data: candidate,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occurred!" + error,
    });
  }
};

// @desc    Update candidate
// @route   PUT /api/v1/candidates/:id
// @access  admin
exports.updateCandidate = async (req, res) => {
  // try {
  //   const id = req.params.id;
  //   const { candidateNo, name, vision, mission } = req.body;
  //   const updatedCandidate = await Candidate.update({});
  //   const tx = await contractInstance.updateCandidate(id, name);
  //   await tx.wait();
  //   res.send({
  //     success: true,
  //     message: "Successfully updated candidate data",
  //   });
  // } catch (error) {
  //   res.status(500).send(error.message);
  // }

  try {
    const { candidateNo, name, vision, mission } = req.body;
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { id: id } });
    if (!candidate) {
      return res.status(404).send({
        success: false,
        message: "Candidate not found",
      });
    }
    const updatedCandidate = await Candidate.update(
      {
        candidateNo: candidateNo,
        name: name,
        vision: vision,
        mission: mission,
      },
      { where: { id: id } }
    );

    res.status(200).json({
      success: true,
      message: "Candidate successfully updated!",
      data: updatedCandidate,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove candidate
// @route   DELETE /api/v1/candidates/:id
// @access  admin
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { id: id } });
    if (!candidate) {
      return res.status(400).send({
        success: false,
        message: "Candidate not found.",
      });
    }
    await candidate.destroy();
    res.status(200).json({
      success: true,
      message: "Candidate successfully removed.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Deactivate candidate
// @route   PUT /api/v1/candidates/:id
// @access  admin
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
exports.deactivateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    // const tx = await contractInstance.deactivateCandidate(id);
    // await tx.wait();
    const deactivatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id
    );

    res.status(200).send({
      success: true,
      message: "Candidate successfully deactivated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occurred!" + error,
    });
  }
};
