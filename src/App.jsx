import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");

  const checkScammer = () => {
    // Ini adalah contoh, nanti boleh sambungkan dengan AI
    if (address === "contoh_scam_address") {
      setResult("Akaun ini adalah SCAM!");
    } else {
      setResult("Akaun ini selamat.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Pengesanan Scammer</h1>
      <input
        type="text"
        placeholder="Masukkan alamat akaun..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={checkScammer}>Periksa</button>
      <p>{result}</p>
    </div>
  );
}

export default App;  
