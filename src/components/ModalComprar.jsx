import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaShoppingCart } from 'react-icons/fa';
import { obtenerItems, comprarItem } from "../api/ConsumirApi";
import "../style/ModalComprar.css";

const ModalComprar = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [step, setStep] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    if (step === "items") {
      cargarItems();
    }
  }, [step]);

  const cargarItems = async () => {
    try {
      const data = await obtenerItems(itemType);
      setItems(data);
    } catch (error) {
      setMensaje(error.message);
      setStep("confirmación");
    }
  };

  const handleComprar = async () => {
    try {
      const message = await comprarItem(itemType, selectedItem.id);
      setMensaje(message);
      setStep("confirmación");
    } catch (error) {
      setMensaje(error.message);
      setStep("confirmación");
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <FaTimes className="close-icon" onClick={onClose} />
        {step === "menu" && (
          <>
            <h2>¿Qué te gustaría comprar?</h2>
            <div className="modal-buttons">
              <button onClick={() => { setItemType("producto"); setStep("items"); }}>
                Producto
              </button>
              <button onClick={() => { setItemType("proyecto"); setStep("items"); }}>
                Proyecto
              </button>
              <button onClick={() => { setItemType("recurso"); setStep("items"); }}>
                Recurso
              </button>
            </div>
          </>
        )}

        {step === "items" && (
          <>
            <h2>Lista de {itemType.charAt(0).toUpperCase() + itemType.slice(1)}s</h2>
            <div className="item-list">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`item ${selectedItem && selectedItem.id === item.id ? "selected" : ""}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <p><strong>{item.name || "Sin nombre"}</strong></p>
                  <p><strong>Costo:</strong> {item.cost || 0}</p>
                  <p><strong>Eficiencias:</strong> {item.efficiencies?.join(", ") || "N/A"}</p>
                  <p><strong>Dependencias:</strong> {item.dependencies?.join(", ") || "N/A"}</p>
                </div>
              ))}
            </div>
            {selectedItem && (
              <button className="action-button" onClick={handleComprar}>
                Comprar
                <FaShoppingCart size={20} />
              </button>
            )}
            <button className="boton-regresar" onClick={() => setStep("menu")}>
              <FaArrowLeft className="icon-regresar" />
            </button>
          </>
        )}

        {step === "confirmación" && (
          <>
            <br />
            <p className="mensaje-confirmacion">
              {mensaje}
              <AiOutlineCheckCircle className="icono-confirmacion" />
            </p>
            <button className="boton-regresar" onClick={() => setStep("menu")}>
              <FaArrowLeft className="icon-regresar" />
            </button>
            <br />
          </>
        )}
      </div>
    </div>
  );
};

export default ModalComprar;
