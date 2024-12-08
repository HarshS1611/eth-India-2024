require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
const {  mnemonic, bscscanApiKey } = require("./api.json");

const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY;
// If not set, it uses ours Etherscan default API key.
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.20",
  networks: {
    
    polygonAmoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/grz0ZmJGLvmh--ZEfeBdhgK2SEEigRg_`,
      accounts: [deployerPrivateKey],
    },
    base: {
      url: "https://base-mainnet.g.alchemy.com/v2/grz0ZmJGLvmh--ZEfeBdhgK2SEEigRg_",
      accounts: [deployerPrivateKey],
    },
    baseSepolia: {
      url: "https://base-sepolia.g.alchemy.com/v2/grz0ZmJGLvmh--ZEfeBdhgK2SEEigRg_",
      accounts: [deployerPrivateKey],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/grz0ZmJGLvmh--ZEfeBdhgK2SEEigRg_`,
      accounts: [deployerPrivateKey],
    },
    bnb : {
      url: `https://data-seed-prebsc-1-s1.bnbchain.org:8545`,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },

  },

  etherscan: {
    apiKey: bscscanApiKey
  },
  
  sourcify: {
    enabled: false,
  },

};


