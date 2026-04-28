import React, { useState } from "react";

function UpdateItemModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    console.log({ search, name, price });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Update Items (Main Branch)</h2>

        <div className="modal-body">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Item..." />
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="New Name" />
          <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="New Price" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Update</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateItemModal;