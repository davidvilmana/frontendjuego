import React, { useState, useRef, useEffect } from "react";
import websocketService from "../api/WebSocket"; 
import { FiSend } from "react-icons/fi";
import "../style/Chat.css";

const Chat = () => {
  const [userName, setUserName] = useState("");
  const [personaje, setPersonaje] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const mensajesRef = useRef(null);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    const storedPersonaje = sessionStorage.getItem("personajeSeleccionado");

    if (storedUserName) setUserName(storedUserName);
    if (storedPersonaje) setPersonaje(JSON.parse(storedPersonaje));
  }, []);

  useEffect(() => {
    websocketService.onMessage("nuevo_mensaje", (mensaje) => {
      setMensajes((prevMensajes) => {
        if (prevMensajes.some((msg) => msg.id === mensaje.id)) {
          return prevMensajes;
        }
        return [...prevMensajes, mensaje];
      });
    });

    return () => {
      websocketService.offMessage("nuevo_mensaje");
    };
  }, []);

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const manejarEnvio = () => {
    if (nuevoMensaje.trim() !== "") {
      const mensaje = {
        id: new Date().getTime(),
        usuario: userName,
        mensaje: nuevoMensaje,
        avatar: personaje?.ruta_img || "/default-avatar.png",
      };

      websocketService.emitMessage("enviar_mensaje", mensaje);

      setNuevoMensaje("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages" ref={mensajesRef}>
        {mensajes.map((msg) => (
          <div key={msg.id} className="message">
            <img
              src={msg.avatar}
              alt={msg.usuario}
              className="message-avatar"
            />
            <div>
              <p className="message-usuario">{msg.usuario}</p>
              <p className="message-texto">{msg.mensaje}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          className="input-mensaje"
        />
        <button onClick={manejarEnvio} className="send-button">
          <FiSend size={24} style={{ marginRight: "8px" }} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
