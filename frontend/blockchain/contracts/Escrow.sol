// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    struct Challenge {
        address creator;
        address participant;
        uint256 stake;
        bool completed;
        address winner;
    }

    IERC20 public platformToken;
    mapping(uint256 => Challenge) public challenges;
    uint256 public nextChallengeId;

    event ChallengeCreated(
        uint256 indexed challengeId,
        address indexed creator,
        uint256 stake
    );
    event ChallengeJoined(
        uint256 indexed challengeId,
        address indexed participant
    );
    event ChallengeResolved(
        uint256 indexed challengeId,
        address indexed winner
    );
    event ChallengeInitiated(address creator);

    constructor(address _platformToken) {
        platformToken = IERC20(_platformToken);
    }

    // P2P Challenge
    function createP2PChallenge() external payable {
        emit ChallengeInitiated(msg.sender);
        require(msg.value > 0, "Stake must match the sent amount");
        challenges[nextChallengeId] = Challenge({
            creator: msg.sender,
            participant: address(0),
            stake: msg.value,
            completed: false,
            winner: address(0)
        });
        nextChallengeId++;

        emit ChallengeCreated(nextChallengeId, msg.sender, msg.value);
    }

    function joinP2PChallenge(uint256 _challengeId) external payable {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.creator != address(0), "Challenge does not exist");
        require(
            challenge.participant == address(0),
            "Challenge already has a participant"
        );
        require(
            msg.value == challenge.stake,
            "Stake must match the creator's stake"
        );

        challenge.participant = msg.sender;
        emit ChallengeJoined(_challengeId, msg.sender);
    }

    function resolveP2PChallenge(uint256 _challengeId)
        external
    {
        emit ChallengeInitiated(msg.sender);

        Challenge storage challenge = challenges[_challengeId];
        require(!challenge.completed, "Challenge already resolved");
        

        challenge.completed = true;
        challenge.winner = msg.sender;
        payable(msg.sender).transfer(challenge.stake * 2);

        emit ChallengeResolved(_challengeId, msg.sender);
    }

    // P2C Challenge
    function createP2CChallenge() external {
        emit ChallengeInitiated(msg.sender);

        challenges[nextChallengeId] = Challenge({
            creator: address(platformToken),
            participant: msg.sender,
            stake: 0.0001 ether,
            completed: false,
            winner: address(0)
        });
        nextChallengeId++;

        emit ChallengeCreated(nextChallengeId, msg.sender, 0.0001 ether);
    }

    function resolveP2CChallenge(uint256 _challengeId) external {
        emit ChallengeInitiated(msg.sender);

        Challenge storage challenge = challenges[_challengeId];
        require(!challenge.completed, "Challenge already resolved");
        require(
            msg.sender == challenge.creator ||
                msg.sender == challenge.participant,
            "Invalid winner"
        );

        challenge.completed = true;
        challenge.winner = msg.sender;
        platformToken.transferFrom(
            challenge.creator,
            challenge.participant,
            challenge.stake
        );

        emit ChallengeResolved(_challengeId, challenge.participant);
    }
}