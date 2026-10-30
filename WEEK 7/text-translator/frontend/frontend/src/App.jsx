
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("German");
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = [
    "English",
    "German",
    "Malay",
    "French",
    "Spanish",
    "Japanese",
    "Korean",
    "Chinese",
    "Arabic",
  ];

  const handleTranslate = async () => {
    if (!textInput.trim()) {
      setError("Please enter text to translate.");
      return;
    }

    setLoading(true);
    setError("");
    setTranslatedText("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/translate",
        {
          input_language: inputLanguage,
          output_language: outputLanguage,
          text_input: textInput,
        }
      );

      setTranslatedText(response.data.translated_text);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Cannot connect to translation server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="translator-card">
        <div className="heading">
          <span className="logo">✦</span>
          <h1>Text Translator</h1>
          <p>Translate your words into different languages.</p>
        </div>

        <div className="language-row">
          <div className="field">
            <label>Input Language</label>
            <select
              value={inputLanguage}
              onChange={(e) => setInputLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Output Language</label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-row">
          <div className="field">
            <label>Enter text to translate</label>
            <textarea
              placeholder="Type something here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Translation</label>
            <textarea
              placeholder="Your translation will appear here..."
              value={translatedText}
              readOnly
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="translate-btn"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "TRANSLATING..." : "TRANSLATE"}
        </button>

        <p className="footer">Powered by FastAPI & React</p>
      </div>
    </div>
  );
}

export default App;
