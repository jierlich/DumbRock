import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import MainText from "./MainText";
import MintComponent from "./MintComponent";
import ExternalButtons from "./ExternalButtons";

function App() {
  const [signer, setSigner] = useState(null);

  return (
    <div className="app">
      <ConnectWalletButton
        sendData={async (val) => {
          setSigner(val);
        }}
      />
      <img src="https://drive.google.com/uc?export=view&id=1Ayjo4JtQFXFm3VMMqAhw1tpffRysDWmA" />
      <MainText />
      <MintComponent />
      <p> 15 / 2100 minted</p>
      <ExternalButtons />
    </div>
  );
}

export default App;
