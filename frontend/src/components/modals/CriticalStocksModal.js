import React from "react";

function CriticalStocksModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Critical Stocks</h2>

        <div className="modal-body">
          <p>Low stock items will appear here.</p>
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CriticalStocksModal;