import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tituloImg from "../assets/logo.png";
import { registrarUsuario } from "../api/ConsumirApi";
import { Toaster, toast } from "sonner";
import { AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";
import "../style/Registro.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      toast(
        <div className="flex items-center gap-2">
          <AiOutlineWarning className="text-yellow-500" />
          Por favor ingresa un nombre válido.
        </div>,
        { type: "warning" }
      );
      return;
    }

      if (password.trim() === "" || password.length < 6) {
        toast(
          <div className="flex items-center gap-2">
            <AiOutlineWarning className="text-yellow-500" />
            La contraseña debe tener al menos 6 caracteres.
          </div>,
          { type: "warning" }
        );
        return;
      }

    try {
      const respuesta = await registrarUsuario(nombre, password);

      sessionStorage.setItem("userName", nombre.trim());
      sessionStorage.setItem("userId", respuesta.id_user);

      navigate("/inicio", {
        state: { userName: nombre.trim(), userId: respuesta.id_user },
      });
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AiOutlineCloseCircle className="text-red-500" />
          {error.message || "Error al registrar el jugador."}
        </div>
      );
    }
  };

  return (
    <div className="registro-container">
      <Toaster position="top-center" expand />
      <img src={tituloImg} className="registro-titulo"/>
  
      <form onSubmit={manejarRegistro} className="registro-form">
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Jugador" className="registro-input" />
        <input type="password"value={password}onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"className="registro-input"/>
        <button type="submit" className="registro-boton">Comenzar</button>
        <button className="boton" onClick={() => navigate("/login")}>Ya eres Jugador</button>
      </form>
    </div>
  );
};

export default Registro;
