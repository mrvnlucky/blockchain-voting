const db = require("../models");
const Candidate = db.Candidate;
// const multer = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

// @desc    Add candidate
// @route   POST /api/v1/candidates
// @access  admin
exports.createCandidate = async (req, res) => {
  try {
    const { candidateNo, name, vision, mission } = req.body;

    // console.log("oiarehagiojgioar");
    const img = await cloudinary.uploader.upload(req.file.path, {
      folder: "Blockvote/candidates",
    });
    console.log(req.file);

    const candidate = await Candidate.create({
      candidateNo: candidateNo,
      name: name,
      vision: vision,
      mission: mission,
      img: img.secure_url,
    });

    res.status(201).send({
      success: true,
      message: "Candidate successfully created",
      data: candidate,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get candidates
// @route   GET /api/v1/candidates
// @access  admin
exports.getAllCandidates = async (req, res) => {
  try {
    const allCandidates = await Candidate.findAll();

    const candidates = allCandidates.map((candidate) => ({
      id: candidate.id,
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
      message: error.message,
    });
  }
};

// @desc    Get one candidate
// @route   GET /api/v1/candidates/:id
// @access  admin
exports.getOneCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { id: id } });

    res.status(200).send({
      success: true,
      message: "Successfully fetched candidate data",
      data: candidate,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update candidate
// @route   PUT /api/v1/candidates/:id
// @access  admin
exports.updateCandidate = async (req, res) => {
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

    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.buffer, {
        folder: "Blockvote/candidates",
      });
      await Candidate.update(
        {
          candidateNo: candidateNo,
          name: name,
          vision: vision,
          mission: mission,
          img: img.secure_url,
        },
        { where: { id: id }, returning: true }
      );
    } else {
      await Candidate.update(
        {
          candidateNo: candidateNo,
          name: name,
          vision: vision,
          mission: mission,
        },
        { where: { id: id }, returning: true }
      );
    }
    // const updatedCandidate = await Candidate.findOne({ where: { id: id } });

    res.status(200).send({
      success: true,
      message: "Candidate successfully updated.",
      // data: updatedCandidate,
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
