import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Ambil kredensial dari environment variable (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");

  // Fungsi untuk mengecek apakah alamat scammer ada di database
  const checkScammer = async () => {
    if (!address.trim()) {
      setResult("⚠️ Masukkan alamat terlebih dahulu!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("scammers")
        .select("*")
        .eq("address", address)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching data:", error);
        setResult("❌ Terjadi kesalahan saat memeriksa.");
        return;
      }

      setResult(data ? "⚠️ Akun ini adalah SCAM!" : "✅ Akun ini aman.");
    } catch (err) {
      console.error("Unexpected error:", err);
      setResult("❌ Terjadi kesalahan.");
    }
  };

  // Fungsi untuk melaporkan scammer ke database
  const reportScammer = async () => {
    if (!address.trim()) {
      alert("⚠️ Masukkan alamat terlebih dahulu!");
      return;
    }

    try {
      const { error } = await supabase
        .from("scammers")
        .insert([{ address, reported_at: new Date() }]);

      if (error) throw error;

      alert("✅ Scammer berhasil dilaporkan!");
    } catch (err) {
      console.error("Gagal melaporkan scammer:", err);
      alert("❌ Gagal melaporkan scammer.");
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
      <button onClick={reportScammer} style={{ marginLeft: "10px" }}>
        Laporkan Scammer
      </button>
      <p>{result}</p>
    </div>
  );
}

export default App;
