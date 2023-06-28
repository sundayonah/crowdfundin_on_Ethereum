
const hre = require("hardhat");

async function main() {



  const CroudFunding = await hre.ethers.getContractFactory("Lock");
  const croudFunding = await CroudFunding.deploy();

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
