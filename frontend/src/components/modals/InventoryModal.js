import React, { useState } from "react";

function InventoryModal({ onClose }) {
  const [search, setSearch] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Inventory</h2>

        <div className="modal-body">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Item..." />

          {/* SAMPLE TABLE */}
          <table style={{ width: "100%", marginTop: "10px", color: "white" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sample Item</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default InventoryModal;