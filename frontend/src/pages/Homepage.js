import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Footer from "../components/Footer";

const BASE_URL = "http://localhost:3001";

function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  async function getAllCandidates() {
    await axios
      .get(`${BASE_URL}/candidates`)
      .then((response) => {
        // console.log(response.data);
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllCandidates();
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function castVote(id) {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x7eE811FDDB3B92625BE62F3a3358512D85D7aB52";
      const abi = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "CandidateAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "CandidateRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "CandidateUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "voter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "candidateId",
              type: "uint256",
            },
          ],
          name: "VoteCasted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [],
          name: "VotingEnded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [],
          name: "VotingStarted",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addCandidate",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "castVote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "endVoting",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllCandidates",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "voteCount",
                  type: "uint256",
                },
              ],
              internalType: "struct Voting.Candidate[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "getCandidate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCandidatesCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getVotingStatus",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "removeCandidate",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "startVoting",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "updateCandidate",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.castVote(id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log(candidates);
  return (
    <>
      <div>
        {hasMetamask ? (
          isConnected ? (
            "Connected! "
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )
        ) : (
          "Please install metamask"
        )}
        {/* {isConnected ? <button onClick={() => castVote()}>Execute</button> : ""} */}
      </div>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Candidates
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              List of Candidates in Current Election
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {candidates.map((candidate) => (
              <Grid item key={candidate.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {candidate.name}
                    </Typography>
                    <Typography>Vote Count: {candidate.voteCount}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={`/candidate/${candidate.id}`}>
                      View
                    </Button>
                    {isConnected ? (
                      <Button
                        size="small"
                        onClick={() => castVote(candidate.id)}
                      >
                        Vote
                      </Button>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Home;
