import { useState } from "react";
import { getDefaultProvider, providers } from "ethers";
import ConnectWalletButton from "./ConnectWalletButton";
import MainText from "./MainText";
import MintComponent from "./MintComponent";
import ExternalButtons from "./ExternalButtons";

function App() {
  const [signer, setSigner] = useState(null);
  const [mintCount, setMintCount] = useState(null);

  const provider = window.ethereum
    ? new providers.Web3Provider(window.ethereum)
    : getDefaultProvider();

  return (
    <div className="app">
      <ConnectWalletButton
        provider={provider}
        sendData={async (val) => {
          setSigner(val);
        }}
      />
      <img src="https://drive.google.com/uc?export=view&id=1Ayjo4JtQFXFm3VMMqAhw1tpffRysDWmA" />
      <MainText />
      <MintComponent
        provider={provider}
        signer={signer}
        setMintCount={setMintCount}
      />
      <p>
        {`${
          mintCount !== null ? mintCount : "install wallet to get count"
        } / 2100 minted`}
      </p>
      <ExternalButtons />
    </div>
  );
}

export default App;
