import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  const fetchData = () => {
    fetch("https://coin-dashboard-new.vercel.app/api/data")
      .then((res) => res.json())
      .then((data) => setCount(data.total))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    await fetch("https://coin-dashboard-new.vercel.app/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coinCount: -count }),
    });
    setCount(0);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#121212",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>💰 Coin Counter</h1>
      <h2 style={{ fontSize: "3rem", margin: "20px" }}>₱{count}</h2>
      <button
        style={{
          background: "#333",
          color: "white",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          border: "none",
          fontSize: "1rem",
        }}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
