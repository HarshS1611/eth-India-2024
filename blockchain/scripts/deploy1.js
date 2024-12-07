const hre = require("hardhat");

async function main() {
  // Compile the contract
  await hre.run("compile");

  // Deploy the contract
  const PlatformToken = await hre.ethers.getContractFactory("PlatformToken");
  const platformToken = await PlatformToken.deploy();

  await platformToken.waitForDeployment();

  console.log(`PlatformToken deployed to: ${platformToken.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
