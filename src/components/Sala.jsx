import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Toaster, toast } from "sonner";
import "../style/Sala.css";

const socket = io("http://127.0.0.1:5000");

const Sala = () => {
  const [userName, setUserName] = useState("");
  const [personaje, setPersonaje] = useState(null);
  const [salaId, setSalaId] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [salaLink, setSalaLink] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    const storedPersonaje = sessionStorage.getItem("personajeSeleccionado");
    if (storedUserName) setUserName(storedUserName);
    if (storedPersonaje) setPersonaje(JSON.parse(storedPersonaje));
  }, []);

  useEffect(() => {
    socket.on("sala_creada", (data) => {
      setSalaId(data.sala_id);
      setUsuarios(data.usuarios);
      setSalaLink(`${window.location.origin}/unirse/${data.sala_id}?user=${userName}`);
      setIsCreator(true);
      toast.success("Sala creada con éxito. Comparte el enlace.");
    });

    socket.on("actualizar_sala", (data) => {
      setUsuarios(data.usuarios);
    });

    socket.on("iniciar_juego", (data) => {
      navigate(`/juego/${data.sala_id}`, { state: { salaId: data.sala_id, usuarios: data.usuarios } });
    });

    return () => {
      socket.off("sala_creada");
      socket.off("actualizar_sala");
      socket.off("iniciar_juego");
    };
  }, [userName, navigate]);

  const crearSala = () => {
    if (!userName.trim() || !personaje) {
      toast.error("Por favor, selecciona un personaje antes de crear una sala.");
      return;
    }
    socket.emit("crear_sala", { user: userName, avatar: personaje.ruta_img });
  };

  const iniciarJuego = () => {
    if (usuarios.length > 1) {
      socket.emit("iniciar_juego", { sala_id: salaId, usuarios });
    } else {
      toast.error("Se necesitan al menos 2 jugadores para iniciar el juego.");
    }
  };

  return (
    <div className="sala-container">
      <Toaster position="top-center" />
      <h1 className="sala-title">
        Yo, <img src={personaje?.ruta_img} className="avatar-title" alt="avatar" /> {userName || "Usuario"}
      </h1>

      {!salaId ? (
        <div className="sala-content">
          <div className="sala-crear">
            <button className="sala-button" onClick={crearSala}>
              Crear Sala
            </button>
          </div>
        </div>
      ) : (
        <div className="sala-content">
          <div className="sala-buttons">
            <h2>
              Has creado la sala <span className="spann">{salaId}</span>
            </h2>
            {isCreator && (
              <button className="sala-button" onClick={iniciarJuego}>
                Iniciar Juego
              </button>
            )}
          </div>
          <div className="sala-jugadores">
            <h4>Jugadores en la sala</h4>
            {usuarios.length > 0 ? (
              <ul>
                {usuarios.map((usuario, index) => (
                  <li key={index} className="jugador-item">
                    <img
                      src={usuario.avatar || "/default-avatar.png"}
                      alt="Avatar"
                      className="jugador-avatar"
                    />
                    <span>{usuario.nombre}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay usuarios en la sala.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sala;
