import React, { useState } from "react";

function NewAccountModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Account</h2>

        <div className="modal-body">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cancel</button>
          <button className="btn-save">Create</button>
        </div>
      </div>
    </div>
  );
}

export default NewAccountModal;