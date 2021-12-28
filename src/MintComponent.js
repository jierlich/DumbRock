import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi";

const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
const dumbRockAddress = "0xe850dD8b9D90F060BCA3A6C7f865228cF6C80062";

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

  const [tx, setTx] = useState(null);

  setMintCount(props, mintRockContract);

  async function approveWBTC() {
    if (!props.signer) {
      alert("Connect your wallet first!");
      return;
    }

    const approveTx = await wbtcContract
      .connect(props.signer)
      .approve(dumbRockAddress, ethers.BigNumber.from("210000"));
    setTx(approveTx.hash);
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

    const mintTx = await mintRockContract
      .connect(props.signer)
      .mintRock(address, { value: ethers.utils.parseUnits("4.2") });
    setTx(mintTx.hash);
  }
  return (
    <div>
      <form
        action="https://matcha.xyz/markets/137/0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"
        target="_blank"
      >
        <button className="externalButton">Buy wBTC</button>
      </form>
      <div className="buttonContainer">
        <button className="externalButton" onClick={() => approveWBTC()}>
          approve wBTC
        </button>
        <button className="externalButton" onClick={() => mintRock()}>
          mint dumb rock
        </button>
      </div>
      {tx ? (
        <div>
          Tx:{" "}
          <a target="_blank" href={`https://polygonscan.com/tx/${tx}`}>
            {tx}
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

async function setMintCount(props, mintRockContract) {
  props.setMintCount(await mintRockContract.count());
}
