import React from "react";

function CriticalStocksModal({ onClose, products = [] }) {

  // 🔥 FILTER LOW + OUT OF STOCK (same logic as your table)
  const criticalItems = products.filter((product) => {
    const stock = Number(product.stock) || 0;
    const critical = Number(product.critical_stocks) || 0;

    return stock === 0 || stock <= critical;
  });

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: "800px" }}>
        <h2>Critical Stocks</h2>

        <div className="modal-body">

          {criticalItems.length === 0 ? (
            <p>No critical items 🎉</p>
          ) : (
            <div className="table-scroll">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>DESCRIPTION</th>
                    <th>UNIT</th>
                    <th>CODE</th>
                    <th>STOCK</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {criticalItems.map((product) => {
                    const stock = Number(product.stock) || 0;
                    const critical = Number(product.critical_stocks) || 0;

                    const isOut = stock === 0;
                    const isLow = stock > 0 && stock <= critical;

                    return (
                      <tr
                        key={product.id}
                        className={
                          isOut ? "out-of-stock" : isLow ? "low-stock" : ""
                        }
                      >
                        <td>{product.description}</td>
                        <td>{product.item_unit || "pcs"}</td>
                        <td>{product.code}</td>
                        <td>{stock}</td>
                        <td>
                          {isOut && (
                            <span className="danger-text">
                              Out of Stock
                            </span>
                          )}
                          {isLow && (
                            <span className="warning-text">
                              Low Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CriticalStocksModal;