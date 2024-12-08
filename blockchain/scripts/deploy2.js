const hre = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run("compile");

  // Specify the PlatformToken address (replace with the actual deployed address)
  const platformTokenAddress = "0x692B876987b4D62F65bc57366287B2c4e9657a2F";

  // Deploy the Escrow contract
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(platformTokenAddress);

  await escrow.waitForDeployment();

  console.log(`Escrow contract deployed to: ${escrow.address}`);
  console.log(`Using PlatformToken at: ${platformTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
