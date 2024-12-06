import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tituloImg from "../assets/logo.png";
import { iniciarSesion } from "../api/ConsumirApi";
import { Toaster, toast } from "sonner";
import { AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";
import "../style/Registro.css";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
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

    try {
      const respuesta = await iniciarSesion(nombre.trim(), password.trim());

      sessionStorage.setItem("userName", respuesta.user.nombre);
      sessionStorage.setItem("userId", respuesta.user.id);

      navigate("/inicio", {
        state: { userName: respuesta.user.nombre, userId: respuesta.user.id },
      });
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AiOutlineCloseCircle className="text-red-500" />
          {error.message || "Error al iniciar sesión."}
        </div>
      );
    }
  };

  return (
    <div className="registro-container">
      <Toaster position="top-center" expand />
      <img src={tituloImg} alt="Logo" className="registro-titulo" />
      <form onSubmit={manejarLogin} className="registro-form">
        <input type="text"value={nombre}onChange={(e) => setNombre(e.target.value)}placeholder="Nombre de Usuario"className="registro-input" />
        <input type="password"value={password}onChange={(e) => setPassword(e.target.value)}placeholder="Contraseña"className="registro-input"/>
        <button type="submit" className="registro-boton">Comenzar</button>
        <button type="button"className="boton" onClick={() => navigate("/registro")} >Eres nuevo jugador</button>
      </form>
    </div>
  );
};

export default Login;
