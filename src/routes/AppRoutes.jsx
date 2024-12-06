import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tienda from "../pages/Tienda";
import Inicio from "../pages/Inicio";
import Registro from "../pages/Registro";
import Login from "../pages/IniciarUsuario";
import Navbar from "../components/Navbar";
import Botones from "../components/HomeBotones";
import Juego from "../components/Juego";
import Sala from "../components/Sala";
import UnirseSala from "../components/UnirseSala";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Botones />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Navbar />}>
          <Route index element={<Inicio />} />
          <Route path="tienda" element={<Tienda />} />
        </Route>
        <Route path="/juego/:salaId" element={<Juego/>} />
        <Route path="/sala" element={<Sala/>} />
        <Route path="/unirse" element={<UnirseSala />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
