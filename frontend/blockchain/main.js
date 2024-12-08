import { Web3 } from "web3";
import axios from "axios";
import { ethers } from "ethers";
import { createCoinbaseWalletSDK } from "@coinbase/wallet-sdk";

const web3 = new Web3(
  "https://base-sepolia.g.alchemy.com/v2/0R7oh787gYhsgAD3G3GZaVIxSXslMvui"
);

export const BASE_SEPOLIA_CHAIN_ID = 84532;

const escrowAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_platformToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
    ],
    name: "ChallengeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "ChallengeInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "ChallengeJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "ChallengeResolved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "challenges",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createP2CChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createP2PChallenge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_challengeId",
        type: "uint256",
      },
    ],
    name: "joinP2PChallenge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextChallengeId",
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
    name: "platformToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_challengeId",
        type: "uint256",
      },
    ],
    name: "resolveP2CChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_challengeId",
        type: "uint256",
      },
    ],
    name: "resolveP2PChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const erc20Abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approveCustom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const escrowContractAddress = `0x4a01034a408d7801b693156e3d87bc3ae7403d21`;
const escrow = new web3.eth.Contract(escrowAbi, escrowContractAddress);

const erc20Address = "0x6E368210Fb3B01D0084Fa93e4e11E062c4bbFebf";
const xfit = new web3.eth.Contract(erc20Abi, erc20Address);

const escrowContract = new ethers.Contract(
  escrowContractAddress,
  escrowAbi,
  ethers.JsonRpcProvider
);
const erc20Contract = new ethers.Contract(
  erc20Address,
  erc20Abi,
  ethers.JsonRpcProvider
);

export const escrowCalls = {
  createP2CChallenge: () => [generateCreateP2CChallengeTx()],
  createP2PChallenge: (value) => [generateCreateP2PChallengeTx(value)],
  joinP2PChallenge: (challengeId, stake) => [
    generateJoinP2PChallengeTx(challengeId, stake),
  ],
  resolveP2PChallenge: (id) => [generateResolveP2PChallenge(id)],
  resolveP2CChallenge: (id) => [generateResolveP2CChallengeTx(id)],
};

async function createP2PChallenge(stake) {
  try {
    const tx = await escrowContract.createP2PChallenge({
      value: ethers.parseEther(stake),
    });
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Challenge created successfully!");
  } catch (error) {
    console.error("Error creating challenge:", error);
  }
}

async function joinP2PChallenge(challengeId, stake) {
  try {
    const tx = await escrowContract.joinP2PChallenge(challengeId, {
      value: ethers.parseEther(stake),
    });
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Joined challenge successfully!");
  } catch (error) {
    console.error("Error joining challenge:", error);
  }
}

// async function resolveP2PChallenge(challengeId) {
//   try {
//     const tx = await escrowContract.resolveP2PChallenge(challengeId);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("Challenge resolved successfully!");
//   } catch (error) {
//     console.error("Error resolving challenge:", error);
//   }
// }

async function createP2CChallenge() {
  try {
    const tx = await escrowContract.createP2CChallenge();
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Challenge created successfully!");
  } catch (error) {
    console.error("Error creating challenge:", error);
  }
}

// async function resolveP2CChallenge(challengeId) {
//   try {
//     const tx = await escrowContract.resolveP2CChallenge(challengeId);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("Challenge resolved successfully!");
//   } catch (error) {
//     console.error("Error resolving challenge:", error);
//   }
// }

// async function getChallengeDetails(challengeId) {
//   try {
//     const challenge = await escrowContract.challenges(challengeId);
//     console.log("Challenge details:", challenge);
//     return challenge;
//   } catch (error) {
//     console.error("Error fetching challenge details:", error);
//   }
// }

// async function getNextChallengeId() {
//   try {
//     const nextChallengeId = await escrowContract.nextChallengeId();
//     console.log("Next Challenge ID:", nextChallengeId.toString());
//     return nextChallengeId.toString();
//   } catch (error) {
//     console.error("Error fetching nextChallengeId:", error);
//   }
// }

// old

export const generateCreateP2PChallengeTx = (value) => {
  const data = escrow.methods.createP2PChallenge().encodeABI();
  return {
    to: escrowContractAddress,
    value: `0x${(parseFloat(value) * 1e18).toString(16)}`,
    data: data,
  };
};

export const generateJoinP2PChallengeTx = (challengeId, stake) => {
  console.log("nepal join p2p", challengeId, stake);
  const data = escrow.methods.joinP2PChallenge(challengeId).encodeABI();
  return {
    to: escrowContractAddress,
    value: `0x${(parseFloat(stake) * 1e18).toString(16)}`,
    data: data,
  };
};

export const generateResolveP2PChallenge = (Id) => {
  const id = Number(Id);
  const data = escrow.methods.resolveP2PChallenge(id).encodeABI();
  return {
    to: escrowContractAddress,
    data: data,
  };
};

export const generateNextChallengeId = async () => {
  try {
    const nextChallengeId = await escrow.methods.nextChallengeId().call();
    const nextChallengeIdInt = Number(nextChallengeId);
    console.log("Next Challenge ID:", nextChallengeIdInt);
    return nextChallengeIdInt;
  } catch (error) {
    console.error("Failed to get next challenge ID:", error);
    throw error;
  }
};
export const generateCreateP2CChallengeTx = () => {
  const data = escrow.methods.createP2CChallenge().encodeABI();
  return {
    to: escrowContractAddress,
    data: data,
  };
};

export const generateResolveP2CChallengeTx = (challengeId) => {
  const data = escrow.methods.resolveP2CChallenge(challengeId).encodeABI();
  return {
    to: escrowContractAddress,
    data: data,
  };
};
// export const generateApproveTx = (from) => {
//   const amount = `0x${(parseFloat(0.0001) * 1e18).toString(16)}`;
//   const data = xfit.methods.approveCustom(xfitAddress,escrowContractAddress, amount).encodeABI();
//   return {
//     from: from,
//     to: xfitAddress,
//     data: data,
//   };
// }

// export const sendRawTransaction = async (rawTx, auth) => {
//   const options = {
//     method: "POST",
//     url: "https://sandbox-api.okto.tech/api/v1/rawtransaction/execute",
//     headers: {
//       Authorization: `Bearer ${auth}`,
//       "Content-Type": "application/json",
//     },
//     data: {
//       network_name: "POLYGON_TESTNET_AMOY",
//       transaction: rawTx,
//     },
//   };

//   try {
//     const { data } = await axios.request(options);
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

export { createP2PChallenge, joinP2PChallenge, createP2CChallenge };

// // Example usage
// const fromAddress = "0xYourAddress";
// const stake = 1; // 1 ether
// const challengeId = 1; // Replace with your challenge ID

// const createP2PChallengeTx = generateCreateP2PChallengeTx(fromAddress, stake);
// const joinP2PChallengeTx = generateJoinP2PChallengeTx(
//   fromAddress,
//   challengeId,
//   stake
// );
