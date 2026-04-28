import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import React, { useState, useEffect, useRef   } from "react";
import { 
FaSearch, 
FaShoppingCart, 
FaMoneyBill, 
FaTimes, 
FaPause, 
FaFileAlt, 
FaPrint, 
FaPlus, 
FaPowerOff 
} from "react-icons/fa";
import API from "../services/api";
import ProductModal from "../components/modals/ProductModal";
import CheckoutModal from "../components/modals/CheckoutModal";

function AdminDashboard() {

  const [view, setView] = useState("items");
  const [orNumber, setOrNumber] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [highlightId, setHighlightId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [tendered, setTendered] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const barcodeRef = useRef(null);

const handleCheckout = () => {
  setShowCheckoutModal(true); // no OR yet
};
const generateOR = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const datePart = `${year}${month}${day}`;

  // 🔥 RANDOM 6 DIGITS
  const random = Math.floor(100000 + Math.random() * 900000);

  return `OR-${datePart}-${random}`;
};
useEffect(() => {
  setOrNumber(generateOR()); // start
}, []);
  // FETCH CUSTOMERS NAMES FROM SALES FOR DROPDOWN
const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/sales/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCustomers(res.data);
  } catch (err) {
    console.error("FETCH CUSTOMERS ERROR:", err);
  }
};

useEffect(() => {
  fetchCustomers();
}, []);
  
const handleConfirmCheckout = () => {
  setCart([]);
  setTendered("");
  setDiscount(0);
  setCustomer("");
  setBarcode("");
  setView("items");
  setOrNumber(generateOR());
};
// HANDLES KEYBOARD SHORTCUTS
useEffect(() => {
  const handleKeyPress = (e) => {
    // ✅ safety guard
    if (!e || !e.key) return;

    // 🔥 prevent conflict when modal is open
    if (showModal) return;

    // 🔥 ignore if typing in input fields
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

    // ✅ NO toLowerCase needed
    if (e.key === "i" || e.key === "I") {
      setView("items");
    }

    if (e.key === "c" || e.key === "C") {
      setView("cart");
    }
  };

  window.addEventListener("keydown", handleKeyPress);

  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
}, [showModal]);

// HANDLES DOUBLE CLICK ON PRODUCT ROW
 const handleRowDoubleClick = async (product) => {
  if (Number(product.stock) === 0) return;

  if (Number(product.stock) <= Number(product.critical_stocks || 0)) {
    await Swal.fire({
      icon: "warning",
      title: "Low Stock",
      text: `${product.description} only has ${product.stock} left.`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  setTimeout(() => {
    setBarcode(product.code);
    setSelectedProduct(product);
    setShowModal(true);
  }, 0);
};

  //  COMPUTE SUBTOTAL
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  // TOTAL AFTER DISCOUNT
  const discountAmount = subtotal * (discount / 100);
  const totalAmount = subtotal - discountAmount;
  // CHANGE
  const change = Math.max(tendered - totalAmount, 0);
  const handleNumberInput = (value, setter) => {
    // remove leading zeros
  const cleaned = value.replace(/^0+(?=\d)/, "");

    setter(cleaned === "" ? "" : Number(cleaned));
  };

  // CART FUNCTION
    const handleAddToCart = (product, qty = 1) => {
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.code === product.code);

        if (existing) {

          // 🔥 highlight existing item
          setHighlightId(existing.id);

          return prevCart.map((item) =>
            item.code === product.code
              ? { ...item, qty: item.qty + qty }
              : item
          );
        }

        // 🔥 highlight new item
        setHighlightId(product.id);

        return [
          ...prevCart,
          {
            id: product.id,
            code: product.code,
            name: product.description,
            price: product.price,
            qty: qty,
            unit: product.item_unit,
          },
        ];
      });

      // ✅ CLOSE MODAL
      setShowModal(false);

      // ✅ SWITCH TO CART VIEW
      setView("cart");

    

      // 🔥 REMOVE HIGHLIGHT AFTER 1 SECOND
      setTimeout(() => {
        setHighlightId(null);
      }, 1000);
    };


  // HANDLE BARCODE INPUT
const handleBarcodeKeyDown = async (e) => {
  if (e.key !== "Enter") return;

  e.preventDefault();
  e.stopPropagation();

  if (showModal) return;

  const foundProduct = products.find(
    (p) => p.code.toLowerCase() === barcode.toLowerCase()
  );

  if (!foundProduct) {
    await Swal.fire({
      icon: "error",
      title: "Not Found",
      text: "Product not found",
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    setTimeout(() => setBarcode(""), 0);
    return;
  }

  // ❌ OUT OF STOCK
  if (Number(foundProduct.stock) === 0) {
    await Swal.fire({
      icon: "error",
      title: "Out of Stock",
      text: `${foundProduct.description} is not available.`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    setTimeout(() => setBarcode(""), 0);
    return;
  }

  // ⚠ LOW STOCK
  if (
  Number(foundProduct.stock) <=
  Number(foundProduct.critical_stocks || 0)
) {
    await Swal.fire({
      icon: "warning",
      title: "Low Stock",
      text: `${foundProduct.description} only has ${foundProduct.stock} left.`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  // ✅ OPEN MODAL AFTER ALERT
  setTimeout(() => {
  // 🔥 FORCE REMOVE FOCUS FROM BARCODE INPUT
  barcodeRef.current?.blur();

  setSelectedProduct(foundProduct);
  setShowModal(true);
  setBarcode("");
}, 0);
};

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const filteredProducts = products.filter((product) => {
  const search = description?.toLowerCase() || "";

  return (
    (product.description || "").toLowerCase().includes(search) ||
    (product.name || "").toLowerCase().includes(search) ||
    (product.code || "").toLowerCase().includes(search)
  );
});

  const title = view === "items" ? "Displayed Items" : "Customers Cart";

 

  return (
    <>
      <Navbar products={products}/>

      <div className="pos-container">

        <div className="table-card">

          <div className="table-header">

            <h3>{title}</h3>

            <div className="pos-info">

              <div className="pos-field">
                <label>OR #: </label>
                <span>{orNumber}</span>
              </div>

              <div className="pos-field">
                <label>Item Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

             <div className="pos-field">
  <label>Customer</label>

  <div className="custom-dropdown">
    <input
      type="text"
      value={customer}
      onChange={(e) => setCustomer(e.target.value)}
      onFocus={() => setShowCustomerDropdown(true)}
      placeholder="Walk-in or type name"
    />

    {showCustomerDropdown && (
      <ul className="dropdown-list">
        <li onClick={() => {
          setCustomer("");
          setShowCustomerDropdown(false);
        }}>
          Walk-in
        </li>

        {customers
          .filter(c =>
            c.customer_name.toLowerCase().includes(customer.toLowerCase())
          )
          .map((c, index) => (
            <li
              key={index}
              onClick={() => {
                setCustomer(c.customer_name);
                setShowCustomerDropdown(false);
              }}
            >
              {c.customer_name}
            </li>
          ))}
      </ul>
    )}
  </div>
</div>

            </div>

         <div className="pos-buttons">
            <button className="func-btn" onClick={() => setView("items")}>
              <span className="key">I</span>
              <p>Items</p>
            </button>

            <button className="func-btn" onClick={() => setView("cart")}>
              <span className="key">C</span>
              <p>Cart</p>
            </button>
          </div>
          </div>

          {view === "items" && (
          <div className="table-scroll">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>UNIT</th>
                  <th>CODE</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                </tr>
              </thead>

              <tbody className="table-body-scroll">
              {filteredProducts.map((product) => {
                const stock = Number(product.stock) || 0;
                const critical = Number(product.critical_stocks) || 0;

                const isOutOfStock = stock === 0;
                const isLowStock = stock > 0 && stock <= critical;

                return (
                  <tr
                    key={product.id}
                    onDoubleClick={() => {
                      if (!isOutOfStock) handleRowDoubleClick(product);
                    }}
                    className={
                      isOutOfStock
                        ? "out-of-stock"
                        : isLowStock
                        ? "low-stock"
                        : ""
                    }
                    style={{
                      cursor: isOutOfStock ? "not-allowed" : "pointer",
                      opacity: isOutOfStock ? 0.6 : 1,
                    }}
                  >
                    <td>
                      {product.description}
                      {isLowStock && (
                        <span className="warning-text">Low Stock</span>
                      )}
                      {isOutOfStock && (
                        <span className="danger-text">Out of Stock</span>
                      )}
                    </td>
                   <td>{product.item_unit || "pcs"}</td>
                    <td>{product.code}</td>
                    <td>₱{product.price}</td>
                    <td>{product.stock}</td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        )}

          {view === "cart" && (
            <table className="modern-table">
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>UNIT</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody className="table-body-scroll">
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className={highlightId === item.id ? "highlight-row" : ""}
                  >
                    <td>{item.name}</td>
                    <td>{item.unit || "pcs"}</td>
                    <td>₱{item.price}</td>
                    <td>{item.qty}</td>
                    <td>₱{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

        {/* ROW CONTAINER */}
        <div className="bottom-row">

        <div className="checkout-card">
            <h3>Checkout</h3>
              <div className="pos-field">
                <label>Barcode: </label>
               <input
                  ref={barcodeRef}
                  type="text"
                  disabled={showModal} // 🔥 THIS STOPS FOCUS STEALING
                  placeholder="Scan or enter barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  onKeyDown={handleBarcodeKeyDown}
                />
              </div>
              <div className="pos-field">
                <label>Subtotal: </label>
                <input type="text" value={`₱${subtotal}`} readOnly />  
              </div>  
              <div className="pos-field">
                <label>Discount (%): </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => handleNumberInput(e.target.value, setDiscount)}
                  placeholder="0"
                />
              </div>
              <div className="pos-field">
                <label>Discount Amount: </label>
                <input
                  type="text"
                  value={`₱${discountAmount.toFixed(2)}`}
                  readOnly
                />
              </div>

              <div className="pos-field">
                <label>Total Amount: </label>
                <input
                  type="text"
                  value={`₱${totalAmount.toFixed(2)}`}
                  readOnly
                />
              </div>

              <div className="pos-field">
                <label>Tendered Amount: </label>
                <input
                  type="number"
                  value={tendered}
                  onChange={(e) => handleNumberInput(e.target.value, setTendered)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (cart.length === 0) {
                        alert("Cart is empty!");
                        return;
                      }

                     handleCheckout();
                    }
                  }}
                  placeholder="0"
                />
              </div>

              <div className="pos-field">
                <label>Change: </label>
                <input
                  type="text"
                  value={`₱${change >= 0 ? change.toFixed(2) : "0.00"}`}
                  readOnly
                />
              </div>
          </div>

          <div className="functions-card">
            <h3>Functions</h3>

            <div className="functions-grid">

             <button className="func-btn search">
                <span className="key">F1</span>
                <FaSearch className="func-icon"/>
                <p>Search Item</p>
              </button>

              <button className="func-btn qty">
                <span className="key">F2</span>
                <FaShoppingCart className="func-icon"/>
                <p>Change QTY</p>
              </button>

              <button className="func-btn amount">
                <span className="key">F3</span>
                <FaMoneyBill className="func-icon"/>
                <p>Change Amt</p>
              </button>

              <button className="func-btn delete">
                <span className="key">F4</span>
                <FaTimes className="func-icon"/>
                <p>Delete Item</p>
              </button>

              <button className="func-btn hold">
                <span className="key">F5</span>
                <FaPause className="func-icon"/>
                <p>Hold Trans</p>
              </button>

              <button className="func-btn recall">
                <span className="key">F6</span>
                <FaFileAlt className="func-icon"/>
                <p>Recall Trans</p>
              </button>

              <button className="func-btn print">
                <span className="key">F7</span>
                <FaPrint className="func-icon"/>
                <p>Reprint OR</p>
              </button>

              <button className="func-btn new">
                <span className="key">F8</span>
                <FaPlus className="func-icon"/>
                <p>New Trans</p>
              </button>

              <button className="func-btn exit">
                <span className="key">Esc</span>
                <FaPowerOff className="func-icon"/>
                <p>Exit</p>
              </button>

            </div>
          </div>

          <div className="logo-card">
            <img 
              src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/437875199_122098649174283364_1014770551408359189_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEF3j-UJ-ZMUWce3217UrzW7V_aw40f-eHtX9rDjR_54ZNQ3OE4Ho1Dx8KUy0j_fL5Ugdl2pENQrqt_cdgrYHWv&_nc_ohc=wlRtYh-Rv78Q7kNvwEcjGad&_nc_oc=AdqmSluHDg45bW64uWJv7gIfevMgtSjfMGW220T0UP5S54YRVpGQowGNbv1-zFCJHfo&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=_PpAwMzUBh2sQ2C9qi4N8g&_nc_ss=7a3a8&oh=00_Af3FqjpqJ93NwD2y5Y3Qlx6rXUs93Si-36gDVDOFpOH2Mw&oe=69E36B35"
              alt="Company Logo"
              className="logo-image"
            />
          </div>

        </div>

      </div>
       <ProductModal
      show={showModal}
      product={selectedProduct}
      onClose={() => setShowModal(false)}
      onAdd={handleAddToCart}
    />
        <CheckoutModal
      show={showCheckoutModal}
      onClose={() => setShowCheckoutModal(false)}
      onConfirm={handleConfirmCheckout}
      cart={cart}
      subtotal={subtotal}
      discount={discount}
      discountAmount={discountAmount}
      totalAmount={totalAmount}
      tendered={tendered}
      change={change}
      customer={customer}
      onRefresh={fetchProducts}
      receiptNo={orNumber}
    />
    </>
    
  );



}

export default AdminDashboard;