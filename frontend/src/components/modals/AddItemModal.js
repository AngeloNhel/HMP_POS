import React, { useState } from "react";

function AddItemModal({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSave = () => {
    console.log({ name, price, stock });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Item </h2>

        <div className="modal-body">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Item Name" />
          <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="Price" />
          <input value={stock} onChange={(e)=>setStock(e.target.value)} type="number" placeholder="Stock Quantity" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;