
const hre = require("hardhat");

async function main() {

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.deployed();

  console.log( `CrowdFunding deployed to ${crowdFunding.address}`);
}

//CONTRACT ADDRESS   0x5FbDB2315678afecb367f032d93F642f64180aa3
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});