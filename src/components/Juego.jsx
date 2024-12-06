import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaDice, FaGift, FaShoppingCart } from "react-icons/fa";
import { connectWebSocket, emitWebSocketEvent } from "../api/WebSocket";
import PanelLeft from "./PanelLeft";
import GameBoard from "./GameBoard";
import Chat from "./Chat";
import ModalComprar from "./ModalComprar";
import ModalLanzarDados from "./ModalLanzarDados";
import ModalObtener from "./ModalObtener";
import moneda from "../assets/icons/moneda.png";
import Month from "../assets/icons/month.png";
import Star from "../assets/icons/star.png";
import Pasos from "../assets/icons/pasos.png";
import "../style/Juego.css";

const Juego = () => {
  const [gameStatus, setGameStatus] = useState({
    month: 0,
    score: 0,
    budget: 0,
    steps: 0,
  });
  const [userName, setUserName] = useState("");
  const [personaje, setPersonaje] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDadosModalOpen, setIsDadosModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const { salaId } = useParams();
  const location = useLocation();
  const state = location.state || {};

    // Obtener el userId desde sessionStorage
    const userId = sessionStorage.getItem("userId");

  useEffect(() => {

    const storedUserName = sessionStorage.getItem("userName");
    const storedPersonaje = sessionStorage.getItem("personajeSeleccionado");
    const { usuarios: initialUsuarios } = state;

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedPersonaje) {
      setPersonaje(JSON.parse(storedPersonaje));
    }

    if (initialUsuarios) {
      setUsuarios(initialUsuarios);
    }

    connectWebSocket((data) => {
      setGameStatus(data || {});
    });

    emitWebSocketEvent("join_game", { salaId });

    return () => {
      console.log("Limpieza del WebSocket");
    };
  }, [salaId, state]);

  const { month, score, budget, steps } = gameStatus;

  return (
    <div className="app-container">
  
      <PanelLeft usuarios={usuarios || []} salaId={salaId} />

      <div className="game-area">
        <header className="header-container">
          {gameStatus ? (
            <>
              <div className="player-user">
                <div className="player-avatar">
                  <img src={personaje?.ruta_img || "/default-avatar.png"} alt="Avatar" />
                </div>
                <div>
                  <p className="player-name">{userName}</p>
                </div>
              </div>
              <div className="player-resources">
                <p>
                  <img src={Month} className="icon" alt="Mes" />
                  Mes: {month}
                </p>
                <p>
                  <img src={Star} className="icon" alt="Puntos" />
                  Puntos: {score}
                </p>
                <p>
                  <img src={moneda} className="icon" alt="Dinero" />
                  Saldo: {budget}
                </p>
                <p>
                  <img src={Pasos} className="icon" alt="Pasos" />
                  Pasos: {steps}
                </p>
              </div>
              <div className="container-efecien">
                <p className="eficiencias">Eficiencias:</p>
                <div className="efficiency-scroll">
                  <ul className="efficiency-list">
                    {gameStatus.efficiencies &&
                      Object.entries(gameStatus.efficiencies).map(([key, value]) => (
                        <li key={key} className="efficiency-item">
                          <span className="efficiency-key">Eficiencia {key}:</span>
                          <span className="efficiency-value">{value} puntos</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p className="no-data-message">
              No se encontró información del juego. Por favor, inténtalo nuevamente más tarde.
            </p>
          )}
        </header>

        <GameBoard salaId={salaId} />
        <footer className="game-footer">
          <button className="action-button" onClick={() => setIsDadosModalOpen(true)}>
            Lanzar Dados
            <FaDice size={20} />
          </button>
          <ModalLanzarDados
            isOpen={isDadosModalOpen}
            onClose={() => setIsDadosModalOpen(false)}   userId={userId}  salaId={salaId}
          />

          <button className="action-button" onClick={() => setIsModalOpen(true)}>
            Comprar
            <FaShoppingCart size={20} />
          </button>
          <ModalComprar isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

          <button className="action-button" onClick={() => setIsModalOpen1(true)}>
            Evento Aleatorio
            <FaGift size={20} />
          </button>
          <ModalObtener isOpen={isModalOpen1} onClose={() => setIsModalOpen1(false)} />
        </footer>
      </div>

      <Chat salaId={salaId} />
    </div>
  );
};

export default Juego;
