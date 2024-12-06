import React, { useState, useEffect } from "react";
import { obtenerTrajes, obtenerMonedas } from "../api/ConsumirApi";
import "../style/Tienda.css";
import Modal from "./ModalPersonajes";

const Tienda = () => {
  const [activeTab, setActiveTab] = useState("Personajes");
  const [personajes, setPersonajes] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const data = await obtenerTrajes();
        setPersonajes(data);
      } catch (error) {
        console.error("Error al cargar los personajes:", error.message);
      }
    };
    fetchPersonajes();
  }, []);

  useEffect(() => {
    const fetchMonedas = async () => {
      try {
        const data = await obtenerMonedas();
        setMonedas(data);
      } catch (error) {
        console.error("Error al cargar las monedas:", error.message);
      }
    };
    fetchMonedas();
  }, []);

  const handleCardClick = (personaje) => {
    setSelectedPersonaje(personaje);
    setIsModalOpen(true);
  };

  return (
    <div className="tienda">
      <nav className="navbar-tienda">
        <button
          className={`nav-button ${activeTab === "Personajes" ? "active" : ""}`}
          onClick={() => setActiveTab("Personajes")}
        >
          Personajes
        </button>
        <button
          className={`nav-button ${activeTab === "Monedas" ? "active" : ""}`}
          onClick={() => setActiveTab("Monedas")}
        >
          Monedas
        </button>
      </nav>

      <div className="cards-container">
        {activeTab === "Personajes" &&
          personajes.map((personaje) => (
            <div
              key={personaje.id}
              className="card"
              onClick={() => handleCardClick(personaje)}
            >
              <img src={personaje.ruta_img} alt={personaje.titulo} />
              <h3>{personaje.titulo}</h3>
              {personaje.precio && (
                <div className="price">
                  {personaje.precio} <span>🪙</span>
                </div>
              )}
            </div>
          ))}

        {activeTab === "Monedas" &&
          monedas.map((moneda) => (
            <div key={moneda.id} className="card">
              <img src={moneda.ruta_img} alt={moneda.titulo} />
              <h3>{moneda.titulo}</h3>
              <div className="price"><span>{moneda.descripcion}</span></div>
            </div>
          ))}
      </div>

      <button className="continue-button">Comprar</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        personaje={selectedPersonaje}
      />
    </div>
  );
};

export default Tienda;
