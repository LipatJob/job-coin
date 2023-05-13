import { useState } from "react";

function Burn({ contract }) {
  const [amount, setAmount] = useState(0);
  const onBurnClicked = async () => {
    try {
      let tx = await contract.burn(amount);
      tx.wait();
      alert(`You have burned ${amount} coins`);
    } catch (error) {
      console.log(error);
      alert("Transaction Failed" + error.reason);
    }
  };
  return (
    <div className="section">
      <div>
        <h2>Burn Coins</h2>
      </div>
      <div>
        <label>Amount to Burn</label>
        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onBurnClicked}>Burn</button>
      </div>
    </div>
  );
}

export default Burn;
