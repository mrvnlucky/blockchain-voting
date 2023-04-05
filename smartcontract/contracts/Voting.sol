// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Voting {
    // Admin address
    address private admin;

    // Voting status
    bool private isVotingRunning;

    // Candidates data
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    mapping(uint256 => Candidate) private candidates;
    Candidate[] private candidateArray;
    uint256 private candidatesCount;

    struct Voter {
        bool isVoted;
    }

    // Voters data
    mapping(address => Voter) private voters;

    // Constructor
    constructor() {
        admin = msg.sender;
        isVotingRunning = false;
        candidatesCount = 0;
    }

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function.");
        _;
    }

    modifier onlyVotingRunning() {
        require(isVotingRunning == true, "Voting is not running.");
        _;
    }

    modifier onlyVoter() {
        require(voters[msg.sender].isVoted == false, "You have already voted.");
        _;
    }

    // Events
    event CandidateAdded(uint256 id, string name);
    event CandidateRemoved(uint256 id);
    event CandidateUpdated(uint256 id, string name);
    event VotingStarted();
    event VotingEnded();
    event VoteCasted(address voter, uint256 candidateId);

    // Admin functions
    function addCandidate(string memory _name) public onlyAdmin {
        require(bytes(_name).length > 0, "Candidate name should not be empty.");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);

        emit CandidateAdded(candidatesCount, _name);
    }

    function removeCandidate(uint256 _id) public onlyAdmin {
        require(_id > 0 && _id <= candidatesCount, "Invalid candidate ID.");

        delete candidates[_id];

        emit CandidateRemoved(_id);
    }

    function updateCandidate(
        uint256 _id,
        string memory _name
    ) public onlyAdmin {
        require(_id > 0 && _id <= candidatesCount, "Invalid candidate ID.");
        require(bytes(_name).length > 0, "Candidate name should not be empty.");

        candidates[_id].name = _name;

        emit CandidateUpdated(_id, _name);
    }

    function startVoting() public onlyAdmin {
        require(isVotingRunning == false, "Voting is already running.");

        isVotingRunning = true;

        emit VotingStarted();
    }

    function endVoting() public onlyAdmin {
        require(isVotingRunning == true, "Voting has not started.");

        isVotingRunning = false;

        emit VotingEnded();
    }

    // Voter functions
    function castVote(uint256 _id) public onlyVotingRunning onlyVoter {
        require(_id > 0 && _id <= candidatesCount, "Invalid candidate ID.");

        voters[msg.sender].isVoted = true;
        candidates[_id].voteCount++;

        emit VoteCasted(msg.sender, _id);
    }

    // Getters
    function getCandidate(
        uint256 _id
    ) public view returns (uint256, string memory, uint256) {
        require(_id > 0 && _id <= candidatesCount, "Invalid candidate ID.");

        Candidate memory candidate = candidates[_id];

        return (candidate.id, candidate.name, candidate.voteCount);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint256 i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidatesCount;
    }

    function getVotingStatus() public view returns (bool) {
        return isVotingRunning;
    }
}
