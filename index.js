const ethers = require('ethers');
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./artifacts/contracts/Voting.sol/Voting.json")
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require('express');
const app = express();

app.use(express.json());

app.get('/candidates', async (req, res) => {
    try {
        const allCandidates = await contractInstance.getAllCandidates();
        const candidates = allCandidates.map(candidate => ({
            id: parseInt(candidate.id),
            name: candidate.name,
            voteCount: parseInt(candidate.voteCount)
        }));
        console.log(candidates);
        res.send(candidates);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


app.get('/candidates/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = await contractInstance.getCandidate(id);

        const candidate_ = {
            name: candidate[0],
            price: parseInt(candidate[1]),
            quantity: parseInt(candidate[2])
        }
        res.send(candidate_);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/candidates/count', async (req, res) => {
    try {
        const candidatesCount = await contractInstance.getCandidatesCount();
        res.send(candidatesCount);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/candidates', async (req, res) => {
    try {
        const { name } = req.body;
        const tx = await contractInstance.addCandidate(name);
        await tx.wait();
        res.send({ success: true })
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/candidates/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const tx = await contractInstance.updateCandidate(id, name);
        await tx.wait();
        res.send({ success: true })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.delete('/candidates/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tx = await contractInstance.deleteCandidate(id);
        await tx.wait();
        res.send({ success: true })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/vote/start', async (req, res) => {
    try {
        const tx = await contractInstance.startVoting();
        await tx.wait();
        res.send({ success: true })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/vote/end', async (req, res) => {
    try {
        const tx = await contractInstance.endVoting();
        await tx.wait();
        res.send({ success: true })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/vote/status', async (req, res) => {
    try {
        const voteStatus = await contractInstance.getVotingStatus();
        res.send(voteStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.put('/candidates/:id/vote', async (req, res) => {
    try {
        const id = req.params.id;
        const tx = await contractInstance.castVote(id);
        await tx.wait();
        res.send({ success: true })
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
})


// app.get('/products/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const product = await contractInstance.getProduct(id);

//         const prod = {
//             name: product[0],
//             price: parseInt(product[1]),
//             quantity: parseInt(product[2])
//         }
//         res.send(prod);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.get('/products/', async (req, res) => {
//     try {
//         const allProducts = await contractInstance.getAllProducts();
//         const products = allProducts.map(product => ({
//             id: parseInt(product.id),
//             name: product.name,
//             price: parseInt(product.price),
//             quantity: parseInt(product.quantity)
//         }));
//         console.log(products);
//         res.send(products);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.post('/products', async (req, res) => {
//     try {
//         const { id, name, price, quantity } = req.body;
//         const tx = await contractInstance.setProduct(id, name, price, quantity);
//         await tx.wait();
//         res.json({ success: true })
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.put('/products/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { name, price, quantity } = req.body;
//         const tx = await contractInstance.updateProduct(id, name, price, quantity);
//         await tx.wait();
//         res.json({ success: true })
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })

// app.delete('/products/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const tx = await contractInstance.deleteProduct(id);
//         await tx.wait();
//         res.json({ success: true })
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })

const port = 3000;

app.listen(port, () => {
    console.log("Server is listening on port 3000");
})