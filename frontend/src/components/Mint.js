import { useState } from "react";

function Mint({ contract }) {
  const [amount, setAmount] = useState(0);
  const onMintClicked = async () => {
    let tx = await contract.mint(amount);
    tx.wait();
    alert(`You have minted ${amount} coins`);
  };
  return (
    <div className="section">

      <div>
        <h2>Mint Coins</h2>
      </div>
      <div>
        <label>Amount to Mint</label>
        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onMintClicked}>Mint</button>
      </div>
    </div>
  );
}

export default Mint;
