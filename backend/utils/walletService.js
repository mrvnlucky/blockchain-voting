const { ethers } = require("ethers");
const { decryptText, encryptText } = require("./encryption");
require("dotenv").config();
const db = require("../models");
const User = db.User;

// Set constants with env variables
const RPC_URL = process.env.RPC_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Set blockchain RPC providers with ethers
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Set contract abi
const abi =
  require("../smartcontract/artifacts/contracts/Voting.sol/Voting.json").abi;

// Function to fetch the private key from the database based on the user login
const fetchPrivateKeyFromDatabase = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return console.error("User doesn't exist");
  }
  const hashedPrivateKey = user.hashedPrivateKey;
  const privateKey = decryptText(hashedPrivateKey);
  return privateKey;
};

// Set backend wallet signer for admin
const setAdminBackendWalletSigner = () => {
  const privateKey = process.env.PRIVATE_KEY;
  const signer = new ethers.Wallet(privateKey, provider);
  const contractInstance = new ethers.Contract(contractAddress, abi, signer);
  return contractInstance;
};

// Set backend wallet signer for user with the fetched private key
const setUserBackendWalletSigner = (privateKey) => {
  const signer = new ethers.Wallet(privateKey.toString(), provider);
  const contractInstance = new ethers.Contract(contractAddress, abi, signer);
  return contractInstance;
};

// Assign new wallet private key for registered user to database
const createNewWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  const walletAddress = wallet.address;
  const privateKey = wallet.privateKey;
  const hashedPrivateKey = encryptText(privateKey);
};

const logWalletHash = async () => {
  data = await createNewWallet();
  console.log(data);
  // const hash1 = await createNewWallet();
  // console.log("hash1: " + hash1);
};
logWalletHash();

const logFetchPk = async () => {
  const pk = await fetchPrivateKeyFromDatabase(
    "72cd691b-cb47-411e-8462-fd60738dd7b0"
  );
  console.log("pk: " + pk);
};
logFetchPk;

module.exports = {
  fetchPrivateKeyFromDatabase,
  setAdminBackendWalletSigner,
  createNewWallet,
  setUserBackendWalletSigner,
};
