import React from "react";

function UpdateAccountModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Account</h2>

        <div className="modal-body">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="New Password" />
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cancel</button>
          <button className="btn-save">Update</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateAccountModal;