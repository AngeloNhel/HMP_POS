import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";

function ProductModal({ show, product, onClose, onAdd }) {
  const modalRef = useRef(null);
  const [qty, setQty] = useState(1);

  // ✅ Reset qty + FORCE focus when modal opens
 useEffect(() => {
  if (show) {
    setQty(1);

    setTimeout(() => {
      modalRef.current?.focus();

      // 🔥 EXTRA FORCE (fallback)
      document.activeElement !== modalRef.current &&
        modalRef.current?.focus();
    }, 50); // 👈 small delay beats browser focus
  }
}, [show]);

  if (!show || !product) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        tabIndex="0"
        ref={modalRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(product, qty);
          }

          if (e.key === "Escape") {
            onClose();
          }

          // 🔥 PLUS / MINUS CONTROL
        if (e.key === "+" || e.key === "=") {
            setQty((prev) => {
              if (prev >= product.stock) {
                Swal.fire({
                  icon: "warning",
                  title: "Limited Stock",
                  text: `Only ${product.stock} items available.`,
                });
                return prev; // ❌ don't increase
              }
              return prev + 1; // ✅ increase
            });
          }

          if (e.key === "-" && qty > 1) {
            setQty((prev) => prev - 1);
          }
        }}
      >
        <h2>Product Found</h2>

        <div className="modal-body">
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Code:</strong> {product.code}</p>
          <p><strong>Price:</strong> ₱{product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          {/* 🔥 QTY DISPLAY */}
          <p><strong>Quantity:</strong> {qty}</p>
        </div>

        <div className="modal-actions">
          <button
            className="btn-save"
            onClick={() => {
              if (qty > product.stock) {
                Swal.fire({
                  icon: "warning",
                  title: "Limited Stock",
                  text: `Only ${product.stock} items available.`,
                });
                return;
              }
              onAdd(product, qty);
            }}
          >
            Add to Cart
          </button>

          <button
            className="btn-close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;