const ethers = require("ethers");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const router = require("./routes/index");
const db = require("./models");

// Set constants with env variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Set blockchain RPC providers with ethers
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
// Set backend wallet signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
// Set contract ABI
const abi = require("./abi.json");
// Set smart contract instance for backend
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const port = process.env.PORT || 5050;

// const mongoose = require("mongoose");
// mongoose
//   .connect(process.env.DB_CONN, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected successfully to MongoDB");
//   })
//   .catch((err) => {
//     return console.error(err);
//   });

// const db = require("./models/");
// db.sequelize.sync().then(() => {
//   initial();
// });

const express = require("express");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React frontend's domain
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

// app.get("/candidates", async (req, res) => {
//   try {
//     const allCandidates = await contractInstance.getAllCandidates();
//     const candidates = allCandidates.map((candidate) => ({
//       id: parseInt(candidate.id),
//       name: candidate.name,
//       voteCount: parseInt(candidate.voteCount),
//     }));
//     console.log(candidates);
//     res.send(candidates);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get("/candidates/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const candidate = await contractInstance.getCandidate(id);

//     const candidate_ = {
//       id: parseInt(candidate[0]),
//       name: candidate[1],
//       voteCount: parseInt(candidate[2]),
//     };
//     res.send(candidate_);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get("/count", async (req, res) => {
//   try {
//     const candidatesCount = await contractInstance.getCandidatesCount();
//     const candidatesCount_ = {
//       candidatesCount: parseInt(candidatesCount),
//     };
//     res.send(candidatesCount_);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post("/candidates", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const tx = await contractInstance.addCandidate(name);
//     await tx.wait();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.put("/candidates/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name } = req.body;
//     const tx = await contractInstance.updateCandidate(id, name);
//     await tx.wait();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.delete("/candidates/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const tx = await contractInstance.deleteCandidate(id);
//     await tx.wait();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post("/vote/start", async (req, res) => {
//   try {
//     const tx = await contractInstance.startVoting();
//     await tx.wait();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post("/vote/end", async (req, res) => {
//   try {
//     const tx = await contractInstance.endVoting();
//     await tx.wait();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get("/vote/status", async (req, res) => {
//   try {
//     const voteStatus = await contractInstance.getVotingStatus();
//     res.send(voteStatus);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.put("/vote/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // const signer = provider.getSigner();
//     const tx = await contractInstance.castVote(id);
//     await tx.wait();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send(error.message);
//     console.log(error.message);
//   }
// });

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((error) => {
    console.log("Failed to sync db: " + error.message);
  });
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
