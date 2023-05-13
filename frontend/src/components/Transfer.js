import { useState } from "react";

function Transfer({ contract }) {
  const [toAddress, setToAddress] = useState();
  const [amount, setAmount] = useState();
  const onTransferClicked = async () => {
    try {
      let tx = await contract.transfer(toAddress, amount);
      tx.wait();
      alert(`You have transferred ${amount} coins to ${toAddress}`);
    } catch (error) {
      console.log(error);
      alert("Transaction Failed" + error.reason);
    }
  };
  return (
    <div className="section">
      <div>
        <h2>Transfer Coins</h2>
      </div>
      <div>
        <label>To Address</label>
        <input
          type="text"
          required
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onTransferClicked}>Transfer</button>
      </div>
    </div>
  );
}

export default Transfer;
