import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TokenFactory contract...");

  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  await tokenFactory.deployed();

  console.log("TokenFactory deployed to:", tokenFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 