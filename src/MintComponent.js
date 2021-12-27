import React, { useState } from "react";
import { providers, utils } from "ethers";

export default function MintComponent(props) {
  return (
    <div className="buttonContainer">
      <button className="externalButton">approve wBTC</button>
      <button className="externalButton">mint dumb rock</button>
    </div>
  );
}
