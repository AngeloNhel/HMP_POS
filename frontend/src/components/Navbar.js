import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddItemModal from "./modals/AddItemModal";
import UpdateItemModal from "./modals/UpdateItemModal";
import ReturnItemModal from "./modals/ReturnItemModal";
import SupplierModal from "./modals/SupplierModal";
import DailySalesModal from "./modals/DailySalesModal";
import AddStockModal from "./modals/AddStockModal";
import InventoryModal from "./modals/InventoryModal";
import NewAccountModal from "./modals/NewAccountModal";
import UpdateAccountModal from "./modals/UpdateAccountModal";
import DeleteAccountModal from "./modals/DeleteAccountModal";
import PincodeModal from "./modals/PincodeModal"; 
import CriticalStocksModal from "./modals/CriticalStocksModal";
import SalesReturnModal from "./modals/SalesReturnModal"; 
import VoidTransactionModal from "./modals/VoidTransactionModal";



function Navbar({ products }) {
  const navigate = useNavigate();
  
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);
  const [showStocksDropdown, setShowStocksDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const openModal = (modal) => {
    setActiveModal(modal);
    setShowAccountDropdown(false);
    setShowItemsDropdown(false);
    setShowSalesDropdown(false);
    setShowStocksDropdown(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <nav className="navbar">

        {/* LEFT */}
        <div className="nav-left">
          <h2 onClick={() => navigate("/admin")}>HMP POS</h2>
        </div>

        {/* CENTER */}
        <div className="nav-center">

          {/* Account Settings*/}
          <div
            className="dropdown"
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <button>Account Settings ▾</button>
            {showAccountDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => openModal("newAccount")}>New Account</button>
                <button onClick={() => openModal("updateAccount")}>Update Account</button>
                <button onClick={() => openModal("deleteAccount")}>Delete Account</button>
                <button onClick={() => openModal("pincode")}>Pincode</button>
              </div>
            )}
          </div>

          {/* ITEMS */}
          <div
            className="dropdown"
            onMouseEnter={() => setShowItemsDropdown(true)}
            onMouseLeave={() => setShowItemsDropdown(false)}
          >
            <button>Items ▾</button>
            {showItemsDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => openModal("addItem")}>Add Item</button>
                <button onClick={() => openModal("updateItem")}>Update Item</button>
                <button onClick={() => openModal("returnItem")}>Return Item</button>
                <button onClick={() => openModal("supplier")}>Add Supplier</button>
              </div>
            )}
          </div>

         

          {/* STOCKS */}
          <div
            className="dropdown"
            onMouseEnter={() => setShowStocksDropdown(true)}
            onMouseLeave={() => setShowStocksDropdown(false)}
          >
            <button>Stocks ▾</button>
            {showStocksDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => openModal("addStocks")}>
                  Add Stocks
                </button>
                <button onClick={() => openModal("inventory")}>
                  Inventory
                </button>
              </div>
            )}
          </div>


           {/* SALES */}
          <div
            className="dropdown"
            onMouseEnter={() => setShowSalesDropdown(true)}
            onMouseLeave={() => setShowSalesDropdown(false)}
          >
            <button>Sales Report ▾</button>
            {showSalesDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => openModal("dailySales")}>
                  Daily Sales
                </button>
              </div>
            )}
          </div>

          {/* OTHER BUTTONS (UNCHANGED) */}
          <button onClick={() => openModal("criticalStocks")}>
            Critical Stocks
          </button>

          <button onClick={() => openModal("voidTransactions")}>
            Void Transactions
          </button>

          <button onClick={() => openModal("salesReturn")}>
            Sales Return
          </button>

        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <button onClick={logout}>Logout</button>
        </div>

      </nav>

      {/* ✅ ALL MODALS CONNECTED */}
      {activeModal === "supplier" && (
        <SupplierModal onClose={closeModal} />
      )}

      {activeModal === "dailySales" && (
        <DailySalesModal onClose={closeModal} />
      )}

      {activeModal === "addStocks" && (
        <AddStockModal onClose={closeModal} />
      )}

      {activeModal === "inventory" && (
        <InventoryModal onClose={closeModal} />
      )}
      {activeModal === "newAccount" && (
        <NewAccountModal onClose={closeModal} />
      )}

      {activeModal === "updateAccount" && (
        <UpdateAccountModal onClose={closeModal} />
      )}

      {activeModal === "deleteAccount" && (
        <DeleteAccountModal onClose={closeModal} />
      )}

      {activeModal === "pincode" && (
        <PincodeModal onClose={closeModal} />
      )}

      {/* ITEMS MODALS */}
      {activeModal === "addItem" && (
        <AddItemModal onClose={closeModal} />
      )}

      {activeModal === "updateItem" && (
        <UpdateItemModal onClose={closeModal} />
      )}

      {activeModal === "returnItem" && (
        <ReturnItemModal onClose={closeModal} />
      )}

      {activeModal === "criticalStocks" && (
        <CriticalStocksModal onClose={closeModal} products={products} />
      )}

      {activeModal === "voidTransactions" && (
        <VoidTransactionModal onClose={closeModal} />
      )}

      {activeModal === "salesReturn" && (
        <SalesReturnModal onClose={closeModal} />
      )}

    </>
  );
}

export default Navbar;