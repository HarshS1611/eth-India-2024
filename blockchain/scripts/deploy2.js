const hre = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run("compile");

  // Specify the PlatformToken address (replace with the actual deployed address)
  const platformTokenAddress = "0x94E41D4EFB03D483aB2E1D9addA86DccEd36338B";

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
