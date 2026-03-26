import React from "react";

function SalesReturnModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Sales Return</h2>

        <div className="modal-body">
          <input type="text" placeholder="Item Name" />
          <input type="number" placeholder="Quantity" />
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cancel</button>
          <button className="btn-save">Process</button>
        </div>
      </div>
    </div>
  );
}

export default SalesReturnModal;