// App.jsx
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [coins, setCoins] = useState({
    pennies: 0,
    nickels: 0,
    dimes: 0,
    quarters: 0
  });

  // Fetch latest coin total from backend
  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch("https://coin-dashboard-new.vercel.app/api/data")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.total);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleCoinChange = (coinType, value) => {
    const newCoins = {
      ...coins,
      [coinType]: parseInt(value) || 0
    };
    setCoins(newCoins);
  };

  const handleAddCoins = async () => {
    // Calculate the value of the coins being added
    const valueToAdd = (
      coins.pennies * 0.01 + 
      coins.nickels * 0.05 + 
      coins.dimes * 0.10 + 
      coins.quarters * 0.25
    );
    
    await fetch("https://coin-dashboard-new.vercel.app/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coinCount: valueToAdd }),
    });

    // Refresh the total
    fetchData();
    
    // Reset the input fields
    setCoins({
      pennies: 0,
      nickels: 0,
      dimes: 0,
      quarters: 0
    });
  };

  // Reset function
  const handleReset = async () => {
    await fetch("https://coin-dashboard-new.vercel.app/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coinCount: -count }), // subtract current total
    });

    setCount(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>💰 Coin Counter</h1>
      
      <div style={{
        backgroundColor: "#2a2a2a",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        width: "300px"
      }}>
        <h3>Add Coins:</h3>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Pennies: </label>
          <input
            type="number"
            value={coins.pennies}
            onChange={(e) => handleCoinChange("pennies", e.target.value)}
            style={{ marginLeft: "10px", width: "60px", padding: "5px" }}
          />
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Nickels: </label>
          <input
            type="number"
            value={coins.nickels}
            onChange={(e) => handleCoinChange("nickels", e.target.value)}
            style={{ marginLeft: "10px", width: "60px", padding: "5px" }}
          />
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Dimes: </label>
          <input
            type="number"
            value={coins.dimes}
            onChange={(e) => handleCoinChange("dimes", e.target.value)}
            style={{ marginLeft: "10px", width: "60px", padding: "5px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label>Quarters: </label>
          <input
            type="number"
            value={coins.quarters}
            onChange={(e) => handleCoinChange("quarters", e.target.value)}
            style={{ marginLeft: "10px", width: "60px", padding: "5px" }}
          />
        </div>
        
        <button
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
            width: "100%"
          }}
          onClick={handleAddCoins}
        >
          Add Coins
        </button>
      </div>
      
      <h2>Total: ${count.toFixed(2)}</h2>
      
      <button
        style={{
          background: "#f44336",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
        }}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;