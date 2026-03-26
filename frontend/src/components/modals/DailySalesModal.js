import React, { useState } from "react";

function DailySalesModal({ onClose }) {
  const [date, setDate] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [transactions, setTransactions] = useState("");

  const handleSave = () => {
    console.log({ date, totalSales, transactions });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Daily Sales</h2>

        <div className="modal-body">
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          <input value={totalSales} onChange={(e)=>setTotalSales(e.target.value)} placeholder="Total Sales" />
          <input value={transactions} onChange={(e)=>setTransactions(e.target.value)} placeholder="Total Transactions" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DailySalesModal;