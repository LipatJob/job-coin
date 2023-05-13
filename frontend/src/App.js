import { useState } from "react";
import { ethers } from "ethers";
import JobCoinAbi from "./contracts/JobCoinAbi.json";
import JoinCoinAddress from "./contracts/JobCoinAddress.json";
import Transfer from "./components/Transfer";
import Mint from "./components/Mint";
import GetBalance from "./components/GetBalance";
import Burn from "./components/Burn";

function App() {
  let contractAddress = JoinCoinAddress.address;
  const [walletConnected, setWeb3Connected] = useState(false);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    console.log("Connecting");
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setWeb3Connected(true);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      alert("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setAccount(newAccount);
    updateEthers();
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

    let tempContract = new ethers.Contract(
      contractAddress,
      JobCoinAbi,
      tempSigner
    );
    setContract(tempContract);
  };

  return (
    <div className="container">
      {walletConnected ? (
        <>
          <GetBalance contract={contract} />
          <Mint contract={contract} />
          <Transfer contract={contract} />
          <Burn contract={contract} />
        </>
      ) : (
        <>
          <button onClick={connectWalletHandler}>Connect wallet</button>
        </>
      )}
    </div>
  );
}

export default App;
