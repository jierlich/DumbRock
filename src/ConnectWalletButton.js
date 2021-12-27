import React, { useState } from "react";

export default function ConnectWalletButton(props) {
  const [address, setAddress] = useState("");

  async function connectWallet() {
    await props.provider.send("eth_requestAccounts", []);
    const signer = props.provider.getSigner();
    const { chainId } = await props.provider.getNetwork();
    if (chainId != 137 && chainId != 80001) {
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
