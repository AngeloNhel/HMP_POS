import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import API from "../../services/api";

function AddItemModal({ onClose }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [itemunit, setItemUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [criticalstocks, setCriticalStocks] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/suppliers", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuppliers(res.data);
    } catch (err) {
      console.log("FETCH SUPPLIERS ERROR:", err);
    }
  };

  fetchSuppliers();
}, []);

  const handleSave = async () => {
    try {
      await API.post("/products", {
        code,
        name,
        description,
        base_price: basePrice,
        item_unit: itemunit,
        supplier,
        price: sellingprice,
        stock: quantity,
        critical_stocks: criticalstocks,
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added successfully",
      });

      onClose();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add product",
      });
    }
  };

return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Item</h2>

        <div className="modal-body">
          <input  value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Item Code" />
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Item Name" />
          <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
          <input value={basePrice} onChange={(e)=>setBasePrice(e.target.value)} type="number" placeholder="Base Price" />
          <input value={sellingprice} onChange={(e)=>setSellingPrice(e.target.value)} type="number" placeholder="Selling Price" />
          <select className={`input-style ${itemunit ? "has-value" : ""}`} value={itemunit} onChange={(e) => setItemUnit(e.target.value)}>
             <option value="" disabled hidden>Select Unit</option>
            <option value="pcs">Pieces (pcs)</option>
            <option value="box">Box</option>
            <option value="dozen">Dozen</option>
            <option value="pack">Pack</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="liter">Liter</option>
            <option value="ml">Milliliter (ml)</option>
            <option value="case">Case</option>
            <option value="set">Set</option>
          </select>
          <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" placeholder="Quantity" />
          <select className={`input-style ${itemunit ? "has-value" : ""}`} value={supplier} onChange={(e) => setSupplier(e.target.value)}>
            <option value="" disabled hidden>Select Supplier</option>

            {suppliers.map((s) => (
              <option key={s.id} value={s.supplier_name}>
                {s.supplier_name}
              </option>
            ))}
          </select>
          <input value={criticalstocks} onChange={(e)=>setCriticalStocks(e.target.value)} type="number" placeholder="Critical Stocks" />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;