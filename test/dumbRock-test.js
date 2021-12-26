const { smock } = require("@defi-wonderland/smock");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const BN = ethers.BigNumber.from;

const mintCostBTC = BN("210000");
const initialERC20Mint = BN("210000000");
const mintCostMatic = ethers.utils.parseUnits("4.2");

describe("DumbRock", async () => {
  beforeEach(async () => {
    this.signers = await ethers.getSigners();
    this.deployer = this.signers[0];
    this.user = this.signers[1];

    // Create mock ERC20
    const MockERC20Contract = await ethers.getContractFactory(
      "MockERC20",
      this.deployer
    );
    this.MockERC20 = await MockERC20Contract.deploy(
      "MockERC20",
      "MOCK",
      initialERC20Mint,
      this.user.address
    );
    await this.MockERC20.deployed();

    const DumbRockContract = await smock.mock("DumbRock", this.deployer);
    this.DumbRock = await DumbRockContract.deploy(this.MockERC20.address);
    await this.DumbRock.deployed();
  });

  it("allows mint", async () => {
    await expect(this.DumbRock.ownerOf(0)).to.be.revertedWith(
      "ERC721: owner query for nonexistent token"
    );
    expect(await this.DumbRock.balanceOf(this.user.address)).to.equal(0);
    expect(await this.MockERC20.balanceOf(this.user.address)).to.be.equal(
      initialERC20Mint
    );
    expect(await ethers.provider.getBalance(this.DumbRock.address)).to.equal(0);

    await this.MockERC20.connect(this.user).approve(
      this.DumbRock.address,
      mintCostBTC
    );

    await this.DumbRock.connect(this.user).mintRock(this.user.address, {
      value: mintCostMatic,
    });

    expect(await this.DumbRock.ownerOf(0)).to.equal(this.user.address);
    expect(await this.DumbRock.balanceOf(this.user.address)).to.equal(1);
    expect(await this.MockERC20.balanceOf(this.user.address)).to.equal(
      initialERC20Mint.sub(mintCostBTC)
    );
    expect(await this.MockERC20.balanceOf(this.DumbRock.address)).to.equal(
      mintCostBTC
    );

    expect(await ethers.provider.getBalance(this.DumbRock.address)).to.equal(
      mintCostMatic
    );
  });

  it("allows burn", async () => {
    await expect(
      this.DumbRock.connect(this.user).ownerOf(0)
    ).to.be.revertedWith("ERC721: owner query for nonexistent token");

    await this.MockERC20.connect(this.user).approve(
      this.DumbRock.address,
      mintCostBTC
    );

    await this.DumbRock.connect(this.user).mintRock(this.user.address, {
      value: mintCostMatic,
    });

    expect(await this.DumbRock.ownerOf(0)).to.equal(this.user.address);
    expect(await this.DumbRock.balanceOf(this.user.address)).to.equal(1);
    await this.DumbRock.connect(this.user).burnRock(0);
    await expect(
      this.DumbRock.connect(this.user).ownerOf(0)
    ).to.be.revertedWith("ERC721: owner query for nonexistent token");
    expect(await this.DumbRock.balanceOf(this.user.address)).to.equal(0);

    await this.MockERC20.connect(this.user).approve(
      this.DumbRock.address,
      mintCostBTC
    );
    await this.DumbRock.connect(this.user).mintRock(this.user.address, {
      value: mintCostMatic,
    });
    expect(await this.DumbRock.ownerOf(1)).to.equal(this.user.address);
  });

  it("blocks non-owner burn", async () => {
    await this.MockERC20.connect(this.user).approve(
      this.DumbRock.address,
      mintCostBTC
    );
    await this.DumbRock.connect(this.user).mintRock(this.user.address, {
      value: mintCostMatic,
    });

    await expect(
      this.DumbRock.connect(this.deployer).burnRock(0)
    ).to.be.revertedWith("Only owner can burn");
  });
});
