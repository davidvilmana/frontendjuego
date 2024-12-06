import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTrajes } from "../api/ConsumirApi";
import { Toaster, toast } from "sonner";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import "../style/Inicios.css";

const Inicio = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const [personajes, setPersonajes] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      toast.error("No se encontró el nombre del usuario. Redirigiendo...");
      navigate("/registro");
    }

  }, [navigate]);

  useEffect(() => {
    const cargarPersonajes = async () => {
      try {
        const data = await obtenerTrajes();
        setPersonajes(data);
      } catch (error) {
        toast.error(
          <div>
            <AiOutlineWarning /> Error al obtener los personajes.
          </div>
        );
      }
    };

    cargarPersonajes();
  }, []);


  const manejarSeleccionarPersonaje = (idTraje) => {
    const personaje = personajes.find((p) => p.id === idTraje);
    setPersonajeSeleccionado(personaje);
    sessionStorage.setItem("personajeSeleccionado", JSON.stringify(personaje));
    toast.success(
      <div>
        <AiOutlineCheckCircle className="text-green-900" /> Has seleccionado: {personaje?.titulo}
      </div>
    );
  };

  const manejarComenzarJuego = () => {
    if (!personajeSeleccionado) {
      toast.error("Selecciona un personaje antes de comenzar el juego.");
      return;
    }
    navigate("/juego/:salaId", {
      state: { userName, personajeSeleccionado },
    });
  };
  const crearsala = () => {
    if (!personajeSeleccionado) {
      toast.error("Selecciona un personaje antes de comenzar el juego.");
      return;
    }
    navigate("/sala", {
      state: { userName, personajeSeleccionado },
    });
  };

  const unirsala = () => {
    navigate("/unirse", {
      state: { userName, },
    });
  };

  return (
    <div className="inicio-container">
      <Toaster position="top-center" expand />
      <h1 className="inicio-title">Bienvenido,{userName}👋</h1>
      <h2 className="inicio-title">Escoje tu personaje favorita</h2>
      <div className="personajes-grid">
        {personajes.map((personaje) => (
          <div
            key={personaje.id}
            className={`personaje-card ${personaje.id === personajeSeleccionado?.id ? "selected" : ""
              }`}
            onClick={() =>
              personaje.precio > 0
                ? toast.error("Este personaje permanece envuelto Desbloquéalo para descubrir su verdadero potencial")
                : manejarSeleccionarPersonaje(personaje.id)
            }
          >
            <img
              src={personaje.ruta_img}
              className={`personaje-img ${personaje.precio > 0 ? "locked" : ""
                }`}
              alt={personaje.titulo}
            />
            <p
              className={`personaje-title ${personaje.id === personajeSeleccionado?.id
                ? "selected"
                : "inactive"
                }`}
            >
              {personaje.titulo}
            </p>
            {personaje.precio > 0 && (
              <div className="lock-overlay">
                <span role="img" aria-label="lock">
                  🔒
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="botones-container">
        <button className="comenzar-juego" onClick={crearsala}>Crear Sala</button>
        <button className="comenzar-juego" onClick={unirsala}>Unirme a sala</button>
        <button className="comenzar-juego" onClick={manejarComenzarJuego}>Jugar ahora</button>
      </div>

    </div>
  );
};

export default Inicio;
