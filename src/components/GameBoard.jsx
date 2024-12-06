import React, { useEffect, useState } from "react";
import { subscribeToGameStatus, unsubscribeFromGameStatus } from "../api/WebSocket";
import "../style/Board.css";
import Personaje from "../assets/person_7.png";

const GameBoard = () => {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const generateCalendarData = () => {
    const calendar = [];
    let counter = 1;
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(counter.toString());
        counter++;
      }
      calendar.push(row);
    }
    return calendar;
  };

  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 }); 
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); 
  const [calendarData, setCalendarData] = useState(generateCalendarData()); 
  const [steps, setSteps] = useState(0); 
  const [actionLog, setActionLog] = useState([]); 
  const [personaje, setPersonaje] = useState(null);

  const calculatePosition = (currentDate) => {
    const totalCells = 30; 
    const totalCols = 10; 

    const storedPersonaje = sessionStorage.getItem("personajeSeleccionado");

    if (storedPersonaje) {
      setPersonaje(JSON.parse(storedPersonaje));
    }

    if (currentDate >= totalCells) {
      const newMonthIndex = (currentMonthIndex + 1) % months.length;
      setCurrentMonthIndex(newMonthIndex);
      setCalendarData(generateCalendarData());
      currentDate = currentDate % totalCells; 
    }

    const row = Math.floor(currentDate / totalCols);
    const col = currentDate % totalCols;

    return { row, col };
  };

  useEffect(() => {
    const handleGameStatus = (status) => {
      setSteps(status.steps);
      const newPosition = calculatePosition(status.current_date);
      setPlayerPosition(newPosition);
      setActionLog((prevLog) => [
        `Movido ${status.steps} pasos. Posición actual: ${status.current_date} en el mes ${months[currentMonthIndex]}`,
        ...prevLog,
      ]);
    };

    subscribeToGameStatus(handleGameStatus);

    return () => {
      unsubscribeFromGameStatus();
    };
  }, [currentMonthIndex]); 

  const isPlayerHere = (rowIndex, cellIndex) => {
    return rowIndex === playerPosition.row && cellIndex === playerPosition.col;
  };

  return (
    <div className="game-container">
      <div className="game-board">
        <h2 className="calendar-title">{months[currentMonthIndex]}</h2>
        {calendarData.map((row, rowIndex) => (
          <div className="calendar-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`calendar-cell ${cellIndex % 2 === 1 ? "green" : "white"
                  } ${isPlayerHere(rowIndex, cellIndex) ? "special" : ""}`}
              >
                {isPlayerHere(rowIndex, cellIndex) && (
                  <img src={Personaje} alt="Player" className="special-icon" />
                )}
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
