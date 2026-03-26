import React, { useState } from "react";

function AddStockModal({ onClose }) {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSave = () => {
    console.log({ item, quantity });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Stocks</h2>

        <div className="modal-body">
          <input value={item} onChange={(e)=>setItem(e.target.value)} placeholder="Item Name" />
          <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" placeholder="Quantity" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddStockModal;