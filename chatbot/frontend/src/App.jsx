import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import GettingStartedForm from "./components/GettingStartedForm";
import CredentialsForm from "./components/CredentialsForm";
import "./index.css";

function App() {
  const [step, setStep] = useState(1); // 1 = Getting Started, 2 = Credentials
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    iconUrl: null,
    useGraphRag: false,
    color: "#7c3aed",
  });
  const [creds, setCreds] = useState({
    openai: "",
    azure: "",
    neo4j: "",
  });

  // Navigation between forms
  const goToCredentials = () => setStep(2);
  const goBack = () => setStep(1);

  return (
    <div className="main-layout">
      <div className="left-column">
        {step === 1 ? (
          <GettingStartedForm
            data={formData}
            setData={setFormData}
            onNext={goToCredentials}
          />
        ) : (
          <CredentialsForm
            data={creds}
            setData={setCreds}
            onBack={goBack}
            onSubmit={() => console.log({ ...formData, ...creds })}
          />
        )}
      </div>
      <div className="right-column">
        <h1>Live Preview:</h1>
        <Chatbot
          botName={formData.name || "Chatbot"}
          botIcon={formData.iconUrl}
          botColor={formData.color}
        />
      </div>
    </div>
  );
}
export default App;