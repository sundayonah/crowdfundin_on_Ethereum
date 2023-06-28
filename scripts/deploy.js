
const hre = require("hardhat");

async function main() {

  const CroudFunding = await hre.ethers.getContractFactory("Lock");
  const croudFunding = await CroudFunding.deploy();

  await lock.deployed();

  console.log( `deployed to ${lock.address}`);

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
}