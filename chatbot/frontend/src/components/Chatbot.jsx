import React, { useState } from "react";
import "./Chatbot.css";
import { FaRobot , FaTimes, FaComments, FaChevronDown } from "react-icons/fa";

export default function Chatbot({ botName, botIcon, botColor }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {from: "bot", text: "Hey there 👋 How can I help you today?"}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages([...messages, {from: "user", text: userMsg}]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: userMsg}),
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, {from: "bot", text: data.answer}]);
    } catch (err) {
      setMessages(msgs => [...msgs, {from: "bot", text: "Error: Could not connect to chatbot backend."}]);
    }
    setLoading(false);
  }

  return (
    <div className="chatbot-floating">
      <button
        className="chatbot-toggle"
        style={{ background: botColor }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <FaTimes size={28} /> : <FaComments size={28} />}
      </button>

      <div className={`chatbot-window ${open ? "open" : ""}`}>
        <div className="chatbot-header" style={{ background: botColor }}>
          <div className="chatbot-header-info">
            {botIcon ? (
              <img src={botIcon} alt="bot" className="chatbot-header-icon" />
            ) : (
              <FaRobot size={32} color="#fff" />
            )}
            <span>{botName}</span>
          </div>
          <button className="chatbot-header-close" onClick={() => setOpen(false)}>
            <FaChevronDown size={20} />
          </button>
        </div>
        <div className="chatbot-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-message ${msg.from}`}
              style={msg.from === "user" ? {background: botColor, color: "#fff"} : {}}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chatbot-message bot">Thinking...</div>}
        </div>
        <div className="chatbot-footer">
          <input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button className="chatbot-send" style={{ background: botColor }}
            onClick={sendMessage} disabled={loading || !input.trim()}>
            <span>↑</span>
          </button>
        </div>
      </div>
    </div>
  );
}