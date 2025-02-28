import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Gantilah dengan kredensial dari Supabase
const supabaseUrl = "https://falntyygmtmgwgnyipcc.supabase.co"; // Ganti dengan URL dari Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbG50eXlnbXRtZ3dnbnlpcGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MzIxNzIsImV4cCI6MjA1NjMwODE3Mn0.VIMJIgWUuMTdNlgwy-0gkAexSUYQ3wHQePQBPp764ZM"; // Ganti dengan Anon Key dari Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");

  const checkScammer = async () => {
    const { data, error } = await supabase
      .from("scammers")
      .select("*")
      .eq("address", address)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
      setResult("Terjadi kesalahan. Coba lagi.");
      return;
    }

    if (data) {
      setResult("⚠️ Akun ini adalah SCAM!");
    } else {
      setResult("✅ Akun ini aman.");
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
