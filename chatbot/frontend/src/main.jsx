import React from "react";
import ReactDOM from "react-dom/client";
import Chatbot from "./components/Chatbot.jsx";
import "./index.css";

const config = window.chatbotConfig || {
  botName: "Chatbot",
  botIcon: null,
  botColor: "#7c3aed"
};

const root = ReactDOM.createRoot(document.getElementById("chatbot-root"));
root.render(<Chatbot {...config} />);