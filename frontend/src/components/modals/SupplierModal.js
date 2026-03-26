import React, { useState } from "react";

function SupplierModal({ onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    console.log({ name, contact, address });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Supplier</h2>

        <div className="modal-body">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Supplier Name" />
          <input value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Contact Number" />
          <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default SupplierModal;