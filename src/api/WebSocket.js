import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

export const connectWebSocket = (onMessageCallback) => {
  try {
    socket.on("connect", () => {
      console.log("Conexión WebSocket establecida");
    });

    socket.on("game_status", (data) => {
      console.log("Estado del juego recibido:", data);
      if (onMessageCallback) {
        onMessageCallback(data);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Error de conexión WebSocket:", error);
    });

    socket.on("disconnect", () => {
      console.log("Conexión WebSocket cerrada");
    });
  } catch (error) {
    console.error("Error al conectar al WebSocket:", error);
    throw error;
  }
};


export const emitWebSocketEvent = (event, data) => {
  try {
    socket.emit(event, data);
    console.log(`Evento emitido: ${event}`, data);
  } catch (error) {
    console.error("Error al emitir evento WebSocket:", error);
  }
};

// Escuchar un evento
export const onMessage = (event, callback) => {
  socket.on(event, callback);
};

// Emitir un evento
export const emitMessage = (event, data) => {
  socket.emit(event, data);
};

// Desconectar el socket
export const offMessage = (event) => {
  socket.off(event);
};


// Función para suscribirse a un evento
export const subscribeToGameStatus = (callback) => {
  socket.on("game_status", callback);
};

// Función para desconectarse de un evento
export const unsubscribeFromGameStatus = () => {
  socket.off("game_status");
};



export default {
  connectWebSocket,
  emitWebSocketEvent,
  onMessage,
  emitMessage,
  offMessage,
  subscribeToGameStatus,
  unsubscribeFromGameStatus
};
