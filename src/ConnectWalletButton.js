import React, { useState } from "react";
import { providers, utils } from "ethers";

export default function ConnectWalletButton(props) {
  const [address, setAddress] = useState("");

  async function connectWallet() {
    const provider = new providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const { chainId } = await provider.getNetwork();
    if (chainId != 137) {
      alert("Please connect to the Polygon network and try again");
      return;
    }
    props.sendData(signer);
    setAddress(await signer.getAddress());
  }

  return (
    <div className="connect-button-container">
      <button onClick={() => connectWallet()} className="connectWallet">
        {address ? `${formatAddress(address)}` : "Connect Wallet"}
      </button>
    </div>
  );
}

function formatAddress(address) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
