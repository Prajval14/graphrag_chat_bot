import React, { useRef } from "react";
import { FaRobot } from "react-icons/fa";
import "./GettingStartedForm.css";

const getFileDataUrl = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

export default function GettingStartedForm({ data, setData, onNext }) {
  const fileInputRef = useRef(null);

  return (
    <div className="form-center-wrap">
    <div className="form-container">
      <h2>Getting Started</h2>
      <p>Fill out the details to set up your chatbot widget.</p>
      <form
        onSubmit={e => { e.preventDefault(); onNext(); }}
        className="getting-started-form"
      >
        <label>Website URL</label>
        <input
          type="url"
          value={data.url}
          onChange={e => setData(d => ({ ...d, url: e.target.value }))}
          required
          placeholder="https://yourwebsite.com"
        />
        <label>Chatbot Name</label>
        <input
          type="text"
          value={data.name}
          onChange={e => setData(d => ({ ...d, name: e.target.value }))}
          placeholder="Chatbot Name"
        />
        <label>Chatbot Icon</label>
        <div className="icon-upload-row">
          <div>
            {data.iconUrl
              ? <img src={data.iconUrl} alt="icon" className="bot-icon-img" />
              : <FaRobot size={36} />

            }
          </div>
          <button type="button" onClick={() => fileInputRef.current.click()}>Change</button>
          <button type="button" onClick={() => setData(d => ({ ...d, iconUrl: null }))}>Reset</button>
          <input
            type="file"
            accept="image/png"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={async e => {
              const file = e.target.files[0];
              if (file) {
                const url = await getFileDataUrl(file);
                setData(d => ({ ...d, iconUrl: url }));
              }
            }}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={data.useGraphRag}
            onChange={e => setData(d => ({ ...d, useGraphRag: e.target.checked }))}
          /> Use GraphRAG Module
        </label>
        <label>Chatbot Color</label>
        <div className="color-picker-row">
          <input
            type="color"
            value={data.color}
            onChange={e => setData(d => ({ ...d, color: e.target.value }))}
          />
          <input
            type="text"
            value={data.color}
            onChange={e => setData(d => ({ ...d, color: e.target.value }))}
            placeholder="#7c3aed"
          />
        </div>
        <button className="primary-btn" type="submit">Create Chatbot</button>
      </form>
    </div>
    </div>
  );
}
