import React from "react";

function VoidTransactionModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Void Transaction</h2>

        <div className="modal-body">
          <input type="text" placeholder="Enter OR Number" />
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cancel</button>
          <button className="btn-save">Void</button>
        </div>
      </div>
    </div>
  );
}

export default VoidTransactionModal;