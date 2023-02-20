"use strict";

require("@nomicfoundation/hardhat-toolbox"); //const INFURA_API_KEY = "f73fff54e0464412bddd157e61d28f6e";


var INFURA_PRIVATE_KEY = "8c64d78198f894e102c234768e401d2367e3073a2d85b86b0ee1f48a972ebe1b";
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/f73fff54e0464412bddd157e61d28f6e",
      accounts: [INFURA_PRIVATE_KEY]
    }
  }
};