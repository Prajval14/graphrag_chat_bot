import React, { useState } from "react";
import "./Chatbot.css";
import { FaRobot , FaTimes, FaComments, FaChevronDown } from "react-icons/fa";

export default function Chatbot({ botName, botIcon, botColor }) {
  const [open, setOpen] = useState(true);

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
          <div className="chatbot-message bot">
            Hey there 👋<br />How can I help you today?
          </div>
          <div className="chatbot-message user" style={{ background: botColor }}>
            Hello there!
          </div>
          <div className="chatbot-message bot">
            Hello!<br />What's on your mind?
          </div>
          <div className="chatbot-message user" style={{ background: botColor }}>
            What is the location of this company?
          </div>
        </div>
        <div className="chatbot-footer">
          <input type="text" placeholder="Message..." disabled />
          <button className="chatbot-send" style={{ background: botColor }}>
            <span>↑</span>
          </button>
        </div>
      </div>
    </div>
  );
}
