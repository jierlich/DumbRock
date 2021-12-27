const { ethers } = require("hardhat");
const BN = ethers.BigNumber.from;

const initialERC20Mint = BN("210000000");

async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0];
  const { chainId } = await ethers.provider.getNetwork();
  const isMainNet = chainId === 137;

  console.log(`Starting deploy on ${isMainNet ? "mainnet" : "testnet"}`);
  let wbtcAddress = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
  if (!isMainNet) wbtcAddress = await deployMock(deployer);

  console.log(`wBTC is stored at address ${wbtcAddress}`);
  const DumbRockContract = await ethers.getContractFactory(
    "DumbRock",
    deployer
  );
  const DumbRock = await DumbRockContract.deploy(wbtcAddress);
  const deployTx = await DumbRock.deployed();
  console.log(`Dumb Rock deployed at ${deployTx.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

async function deployMock(deployer) {
  console.log("Deploying MockERC20");
  const MockERC20Contract = await ethers.getContractFactory(
    "MockERC20",
    deployer
  );
  const MockERC20 = await MockERC20Contract.deploy(
    "MockERC20",
    "MOCK",
    initialERC20Mint,
    deployer.address
  );
  return (await MockERC20.deployed()).address;
}
