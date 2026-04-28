import React from "react";
import Swal from "sweetalert2";
import API from "../../services/api";

function CheckoutModal({
  show,
  onClose,
  onConfirm,
  cart,
  subtotal,
  discount,
  discountAmount,
  totalAmount,
  tendered,
  change,
  customer,
  onRefresh,
  receiptNo

}) {
  if (!show) return null;

  const handlePrint = () => {
    window.print();
  };
  // checkout modal reciept
 const handleConfirm = async () => {
  try {
    const res = await API.post("/sales/checkout", {
  receipt_no: receiptNo, // ✅ SAME OR
  cart,
  subtotal,
  discount_percent: discount,
  discount_amount: discountAmount,
  total_amount: totalAmount,
  tendered,
  change_amount: change,
  customer_name: customer,
  user_id: 1
});

    const savedReceipt = res.data.receipt_no;

    await Swal.fire({
      icon: "success",
      title: "Sale Completed",
      text: `Receipt ${savedReceipt}`,
      timer: 1500,
      showConfirmButton: false
    });

    // ✅ UPDATE DASHBOARD OR
    onConfirm(res.data.next_or);

    onClose();
    onRefresh();

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to save sale", "error");
  }
};

  return (
    <div className="modal-overlay">
      <div className="receipt-modal">

        {/* HEADER */}
        <div className="receipt-header">
          <h2>SALES RECEIPT</h2>
          <p>HMP POS SYSTEM</p>
          <p><strong>Receipt No:</strong> {receiptNo}</p>
          <p>
            <strong>Customer:</strong>{" "}
            {customer && customer.trim() !== "" ? customer : "Walk-in"}
          </p>
        </div>

        {/* ITEMS */}
        <div className="receipt-body">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₱{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* SUMMARY */}
          <div className="receipt-summary">
            <div><span>Subtotal:</span><span>₱{subtotal.toFixed(2)}</span></div>
            <div><span>Discount:</span><span>{discount}%</span></div>
            <div><span>Discount Amt:</span><span>₱{discountAmount.toFixed(2)}</span></div>

            <div className="total-line">
              <span>Total:</span>
              <span>₱{totalAmount.toFixed(2)}</span>
            </div>

            <div><span>Tendered:</span><span>₱{tendered}</span></div>
            <div><span>Change:</span><span>₱{change.toFixed(2)}</span></div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="receipt-actions">
          <button className="print-btn" onClick={handlePrint}>
            🖨 Print
          </button>
         <button className="close-btn" onClick={handleConfirm}>
            Ok
          </button>
        </div>

      </div>
    </div>
  );
}

export default CheckoutModal;