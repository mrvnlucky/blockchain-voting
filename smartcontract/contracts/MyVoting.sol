// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyVoting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    mapping(uint256 => Candidate) candidates;
    uint256 public candidatesCount;

    constructor() {
        candidatesCount = 0;
    }

    function addCandidate(string memory _name) public {
        require(bytes(_name).length > 0, "Candidate name should not be empty.");

        candidatesCount++;
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            voteCount: 0
        });
    }
}
