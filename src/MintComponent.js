import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi";

const wbtcAddress = "0xe4E6A3613a254e59b5bed845AbEEcEa0FEc13803";
const dumbRockAddress = "0x15194ACF98d387FC9B89D848BAfE8C4fcc409a62";

export default function MintComponent(props) {
  const wbtcContract = new ethers.Contract(
    wbtcAddress,
    abi.wbtc,
    props.provider
  );

  const mintRockContract = new ethers.Contract(
    dumbRockAddress,
    abi.dumbRock,
    props.provider
  );

  async function approveWBTC() {
    if (!props.signer) {
      alert("Connect your wallet first!");
      return;
    }

    await wbtcContract
      .connect(props.signer)
      .approve(dumbRockAddress, ethers.BigNumber.from("210000"));
  }

  async function mintRock() {
    if (!props.signer) {
      alert("Connect your wallet first!");
      return;
    }

    const address = await props.signer.getAddress();
    const allowance = await wbtcContract.allowance(address, dumbRockAddress);

    if (!allowance.eq(ethers.BigNumber.from("210000"))) {
      alert("Please verify the approval tx has completed.");
      return;
    }

    await mintRockContract
      .connect(props.signer)
      .mintRock(address, { value: ethers.utils.parseUnits("4.2") });
  }
  return (
    <div className="buttonContainer">
      <button className="externalButton" onClick={() => approveWBTC()}>
        approve wBTC
      </button>
      <button className="externalButton" onClick={() => mintRock()}>
        mint dumb rock
      </button>
    </div>
  );
}
