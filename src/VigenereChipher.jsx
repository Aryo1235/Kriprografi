import { useState } from "react";

const VigenereCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [tab, setTab] = useState("encrypt");
  const [error, setError] = useState("");

  const isValidInput = (text) => /^[a-zA-Z\s]*$/.test(text);
  const isValidKey = (key) => /^[a-zA-Z]+$/.test(key);

  const formatKey = (text, key) => {
    const cleanKey = key.toLowerCase().replace(/[^a-z]/g, "");
    let formatted = "";
    let j = 0;

    for (let i = 0; i < text.length; i++) {
      if (/[a-zA-Z]/.test(text[i])) {
        formatted += cleanKey[j % cleanKey.length];
        j++;
      } else {
        formatted += " ";
      }
    }

    return formatted;
  };

  const vigenereCipher = () => {
    if (!isValidInput(text)) {
      setError("Teks hanya boleh berisi huruf dan spasi.");
      setResult("");
      return;
    }

    if (!isValidKey(key)) {
      setError("Key hanya boleh berisi huruf (A–Z).");
      setResult("");
      return;
    }

    setError("");

    const formattedKey = formatKey(text, key);
    let output = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (!/[a-zA-Z]/.test(char)) {
        output += char;
        continue;
      }

      const isUpper = char === char.toUpperCase();
      const charCode = char.toLowerCase().charCodeAt(0) - 97;
      const keyCode = formattedKey[i].charCodeAt(0) - 97;

      let shifted;
      if (tab === "encrypt") {
        shifted = (charCode + keyCode) % 26;
      } else {
        shifted = (charCode - keyCode + 26) % 26;
      }

      let resultChar = String.fromCharCode(shifted + 97);
      output += isUpper ? resultChar.toUpperCase() : resultChar;
    }

    setResult(output);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Vigenère Cipher</h1>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l ${
            tab === "encrypt" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => {
            setTab("encrypt");
            if (result) {
              setText(result); // pindahkan hasil decrypt ke input text jika ada
              setResult("");
            }
          }}
        >
          Encrypt
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            tab === "decrypt" ? "bg-green-600" : "bg-gray-700"
          }`}
          onClick={() => {
            setTab("decrypt");
            if (result) {
              setText(result); // pindahkan hasil enkripsi ke input teks decrypt
              setResult("");
            }
          }}
        >
          Decrypt
        </button>
      </div>

      <label className="block mb-1">Teks:</label>
      <textarea
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Masukkan teks di sini..."
      />

      <label className="block mb-1">Key:</label>
      <input
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Masukkan key (contoh: secret)"
      />

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <button
        onClick={vigenereCipher}
        className={`w-full py-2 rounded ${
          tab === "encrypt" ? "bg-blue-600" : "bg-green-600"
        } hover:opacity-90 transition`}
      >
        {tab === "encrypt" ? "Enkripsi" : "Dekripsi"}
      </button>

      <label className="block mt-6 mb-1">Hasil:</label>
      <div className="bg-gray-700 p-3 rounded min-h-[3rem] break-words">
        {result}
      </div>

      {key && (
        <p className="text-sm text-gray-400 mt-2">
          Menggunakan key:{" "}
          <span className="font-mono text-white uppercase">{key}</span>
        </p>
      )}
    </div>
  );
};

export default VigenereCipher;
