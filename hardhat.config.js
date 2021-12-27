require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    matic_mainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.alchemyAPIKey}`,
      accounts: [process.env.deployerPK],
    },
    matic_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.alchemyAPIKey}`,
      accounts: [process.env.deployerPK],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  etherscan: {
    apiKey: process.env.etherscanAPIKey,
  },
};
