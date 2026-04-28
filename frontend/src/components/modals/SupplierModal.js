import React, { useState } from "react";
import API from "../../services/api";
import Swal from "sweetalert2";

function SupplierModal({ onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = async () => {
  try {
    await API.post("/suppliers", {
      supplier_name: name,
      contact,
      address,
    });

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Supplier added successfully",
    });

    onClose();
  } catch (err) {
    console.log(err);

    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Failed to add supplier",
    });
  }
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