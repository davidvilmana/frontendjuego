import React, { useState } from "react";
import { obtenerEventoAleatorio } from "../api/ConsumirApi"; 
import { FaTimes } from "react-icons/fa";
import "../style/Modalobtener.css";

const ModalObtener = ({ isOpen, onClose }) => {
  const [evento, setEvento] = useState(null); 

  const obtenerEvento = async () => {
    try {
      const data = await obtenerEventoAleatorio(); 
      setEvento(data); 
    } catch (error) {
      console.error("Error al obtener el evento:", error);
      setEvento({ error: error.message });
    }
  };

  if (!isOpen) {
    return null; 
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <FaTimes className="close-icon" onClick={onClose} />
        {evento && (
          <div className="evento-card">
            {evento.error ? (
              <p className="error">{evento.error}</p>
            ) : (
              <>
                <h3>{`Evento`}</h3>
                <p><strong>Descripción:</strong> {evento.event_description}</p>
                <p><strong>Nivel de Riesgo:</strong> {evento.risk_level}</p>
              </>
            )}
          </div>
        )}
        <br />
        <button className="action-butt" onClick={obtenerEvento}>
          Obtener Aleatorio
        </button>
      </div>
    </div>
  );
};

export default ModalObtener;