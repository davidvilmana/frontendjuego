import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../style/ModalPersonaje.css";

const ModalPersonaje = ({ isOpen, onClose, personaje }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        <img className="character-img" src={personaje.ruta_img} alt={personaje.titulo} />
        <h3 className="character-title">{personaje.titulo}</h3>
        <p className="character-description">{personaje.descripcion}</p>
        <div className="price-container">
          <div className="price">
            <span className="price-icon">💰</span> {personaje.precio}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalPersonaje;
