import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { lanzarDadosAPI } from "../api/ConsumirApi"; 
import dado1 from "../assets/dado-1.png";
import dado2 from "../assets/dado-2.png";
import dado3 from "../assets/dado-3.png";
import dado4 from "../assets/dado-4.png";
import dado5 from "../assets/dado-5.png";
import loadingGif from "../assets/dado.gif";
import "../style/ModalLanzarDados.css";

const ModalLanzarDados = ({ isOpen, onClose, userId }) => {
  const [resultado, setResultado] = useState(null);
  const [numDices, setNumDices] = useState(1);
  const [loading, setLoading] = useState(false);

  const lanzarDados = async () => {
    if (!userId) {
      setResultado({ error: "Usuario no identificado." });
      return;
    }

    setLoading(true);
    setResultado(null);

    try {
      const data = await lanzarDadosAPI(userId, numDices); 
      setTimeout(() => {
        setResultado(data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setResultado({ error: error.message });
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResultado(null); 
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const diceImages = [dado1, dado2, dado3, dado4, dado5];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <FaTimes className="close-icon" onClick={handleClose} />
        <div className="dice-selection">
          <h2>Selecciona el número de dados</h2>
          <br />
          <div className="dice-images">
            {diceImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Dado ${index + 1}`}
                className={`dice-image ${numDices === index + 1 ? "selected" : ""}`}
                onClick={() => setNumDices(index + 1)}
              />
            ))}
          </div>
        </div>

        {loading && (
          <div className="loading-container">
            <img src={loadingGif} alt="Cargando..." className="loading-gif" />
          </div>
        )}
        {resultado && !loading && (
          <div className="resultado-container">
            {resultado.error ? (
              <p className="error">{resultado.error}</p>
            ) : (
              <>
                <p><strong>Dados:</strong> {resultado.dices.join(", ")}</p>
                <p><strong>Pasos Avanzados:</strong> {resultado.steps}</p>
                <p><strong>Nueva Fecha:</strong> {resultado.current_date}</p>
                <p><strong>Campo:</strong> {resultado.field}</p>
                <p><strong>Nuevo Mes:</strong> {resultado.new_month ? "Sí" : "No"}</p>
              </>
            )}
          </div>
        )}
        <button className="action-butt" onClick={lanzarDados} disabled={loading}>
          {loading ? "Lanzando..." : "Lanzar Dados"}
        </button>
      </div>
    </div>
  );
};

export default ModalLanzarDados;
