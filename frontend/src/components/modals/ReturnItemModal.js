import React, { useState } from "react";

function ReturnItemModal({ onClose }) {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState("");

  const handleSave = () => {
    console.log({ item, qty, reason });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Return Item</h2>

        <div className="modal-body">
          <input value={item} onChange={(e)=>setItem(e.target.value)} placeholder="Item Name" />
          <input value={qty} onChange={(e)=>setQty(e.target.value)} type="number" placeholder="Quantity" />
          <input value={reason} onChange={(e)=>setReason(e.target.value)} placeholder="Reason" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Submit</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ReturnItemModal;