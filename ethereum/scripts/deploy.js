
const { ethers } = require("hardhat");
//const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the address: ", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const stopSupply1 = '2000';
  const stopSupply = ethers.utils.parseEther(stopSupply1);

  const RestartGame = await ethers.getContractFactory("RestartGame");
  const restartGame = await RestartGame.deploy(stopSupply);
  //(unlockTime, { value: lockedAmount });

  //await restartGame.deployed();

  console.log("RestartGame deployed to:", restartGame.address);

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});