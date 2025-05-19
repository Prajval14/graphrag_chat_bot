import React from "react";
import "./CredentialsForm.css";

export default function CredentialsForm({ data, setData, onBack, onSubmit }) {
  return (
    <div className="form-container" id="credentials-component">
      <h2>Connect Credentials</h2>
      <button className="back-btn" type="button" onClick={onBack}>&larr; Go Back</button>
      <form
        onSubmit={e => { e.preventDefault(); onSubmit(); }}
        className="credentials-form"
      >
        <label>OpenAI Search API Key</label>
        <input
          type="password"
          value={data.openai}
          onChange={e => setData(d => ({ ...d, openai: e.target.value }))}
          required
        />
        <label>Azure Cognitive Search Key</label>
        <input
          type="password"
          value={data.azure}
          onChange={e => setData(d => ({ ...d, azure: e.target.value }))}
        />
        <label>Neo4j GraphDB URL</label>
        <input
          type="text"
          value={data.neo4j}
          onChange={e => setData(d => ({ ...d, neo4j: e.target.value }))}
        />
        <button className="primary-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
