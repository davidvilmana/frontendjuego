import React from "react";
import { IoClose } from "react-icons/io5"; 

const ComoJugar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>
        
        <h1 className="text-2xl font-bold mb-4">¿Cómo Jugar?</h1>
        <p className="text-gray-600">
        ¡Prepárate para la aventura! Tu misión es recorrer todo el tablero, superando cada desafío que encuentres en las casillas. Cada casilla tiene un número que representa el nivel de dificultad de la tarea que deberás completar. La clave es acumular puntos enfrentando retos cada vez más desafiantes. La partida termina cuando todos completan el recorrido, pero solo será proclamado campeón quien logre la mayor puntuación. ¡Atrévete a ganar y demuestra tu valentía en cada paso!
        </p>
      </div>
    </div>
  );
};

export default ComoJugar;
