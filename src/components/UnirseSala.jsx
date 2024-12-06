import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Toaster, toast } from "sonner";
import "../style/Sala.css";

const socket = io("http://127.0.0.1:5000");

const UnirseSala = () => {
    const [userName, setUserName] = useState(""); 
    const [personaje, setPersonaje] = useState(null); 
    const [salaId, setSalaId] = useState(""); 
    const [usuarios, setUsuarios] = useState([]);
    const [salaInput, setSalaInput] = useState(""); 
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserName = sessionStorage.getItem("userName");
        const storedPersonaje = sessionStorage.getItem("personajeSeleccionado");
        if (storedUserName) setUserName(storedUserName);
        if (storedPersonaje) setPersonaje(JSON.parse(storedPersonaje));
    }, []);

    useEffect(() => {
        socket.on("actualizar_sala", (data) => {
            setSalaId(data.sala_id);
            const uniqueUsuarios = [...new Map(data.usuarios.map((u) => [u.nombre, u])).values()];
            setUsuarios(uniqueUsuarios);
        });

        socket.on("iniciar_juego", (data) => {
            navigate(`/juego/${data.sala_id}`, { state: { salaId: data.sala_id, usuarios: data.usuarios } });
        });

        return () => {
            socket.off("actualizar_sala");
            socket.off("iniciar_juego");
        };
    }, [navigate]);

    const unirseSala = () => {
        if (!salaInput.trim() || !personaje) {
            toast.error("Introduce un ID de sala válido y selecciona un personaje.");
            return;
        }
        socket.emit("unirse_sala", { sala_id: salaInput, user: userName, avatar: personaje.ruta_img });
        toast.success(`Te has unido a la sala ${salaInput}`);
    };

    return (
        <div className="sala-container">
            <Toaster position="top-center" />
            <h1 className="sala-title">
                Bienvenido, <img src={personaje?.ruta_img} className="avatar-title" alt="avatar" /> {userName || "Usuario"}
            </h1>

            {!salaId ? (
                <div className="sala-content">
                    <div className="sala-unirse">
                        <input
                            type="text"
                            placeholder="Introduce el ID de la sala"
                            value={salaInput}
                            onChange={(e) => setSalaInput(e.target.value)}
                            className="sala-input"
                        />
                        <button className="sala-button" onClick={unirseSala}>
                            Unirse a Sala
                        </button>
                    </div>
                </div>
            ) : (
                <div className="sala-content">
                    <div className="sala-buttons">
                        <h2>Has ingresado a la sala <span className="spann">{salaId}</span></h2>
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

export default UnirseSala;
