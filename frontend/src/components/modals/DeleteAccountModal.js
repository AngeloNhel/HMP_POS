import React from "react";

function DeleteAccountModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Delete Account</h2>

        <div className="modal-body">
          <p>Are you sure you want to delete this account?</p>
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cancel</button>
          <button className="btn-save">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;