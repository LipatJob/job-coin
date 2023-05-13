import { useState } from "react";

function GetBalance({ contract }) {
  const [balance, setBalance] = useState();
  const onGetBalanceClicked = async () => {
    let tx = await contract.getBalance();
    setBalance(tx.toNumber());
  };

  return (
    <div className="section">
      <div>
        <h2>Get Balance</h2>
      </div>
      <div>
        <p>Your balance is: {balance}</p>
      </div>
      <div>
        <button onClick={onGetBalanceClicked}>Get Balance</button>
      </div>
    </div>
  );
}

export default GetBalance;
