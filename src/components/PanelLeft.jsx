import React from "react";
import "../style/PanelLeft.css";

const PanelLeft = ({ usuarios = [], salaId }) => {
  return (
    <div className="panel-left">
      <div className="user-section">
        <h3>Sala <span>{salaId}</span> </h3>
      </div>

      <div className="participants-list">
        <h4>Jugadores Conectados</h4>
        <ul>
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <li key={index} className="participant-item">
                <img
                  src={usuario.avatar}
                  alt={usuario.nombre}
                  className="participant-avatar"
                />
                <span>{usuario.nombre}</span>
              </li>
            ))
          ) : (
            <p>No hay usuarios conectados.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PanelLeft;
