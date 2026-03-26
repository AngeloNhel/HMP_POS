import React, { useState } from "react";

function PincodeModal({ onClose }) {
  const [pin, setPin] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Pincode</h2>

        <div className="modal-body">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cancel</button>
          <button className="btn-save">Save</button>
        </div>
      </div>
    </div>
  );
}

export default PincodeModal;