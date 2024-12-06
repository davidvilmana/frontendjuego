const API_URL = "http://127.0.0.1:5000"; 

// Función para registrar un usuario
export const registrarUsuario = async (nombre,password) => {
  try {
    const response = await fetch(`${API_URL}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre,password }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar el usuario.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error.message);
    throw error; 
  }
};

// Función para iniciar sesión
export const iniciarSesion = async (nombre, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, password }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la API (login):", error.message);
    throw error;
  }

};

// Obtener lista de trajes
export const obtenerTrajes = async () => {
  try {
    const response = await fetch(`${API_URL}/personajes`);
    if (!response.ok) {
      throw new Error("Error al obtener trajes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
// Obtener lista de monedas
export const obtenerMonedas = async () => {
  try {
    const response = await fetch(`${API_URL}/monedas`);
    if (!response.ok) {
      throw new Error("Error al obtener monedas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Seleccionar un traje
export const seleccionarTraje = async (id_user, id_traje) => {
  try {
    const response = await fetch(`${API_URL}/seleccionar_personaje`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user, id_traje }),
    });
    if (!response.ok) {
      throw new Error("Error al seleccionar traje");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const lanzarDadosAPI = async (userId, numDices) => {
  try {
    console.log("Lanzando dados para el usuario:", userId, "con:", numDices);
    const response = await fetch(`${API_URL}/game/roll_dice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, num_dices: numDices }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error en la API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al lanzar dados:", error);
    throw new Error("No se pudo conectar con el servidor");
  }
};



// Obtener items según el tipo
export const obtenerItems = async (itemType) => {
  try {
    const endpoint =
      itemType === "producto"
        ? "products"
        : itemType === "proyecto"
        ? "projects"
        : "resources";

    const response = await fetch(`${API_URL}/game/${endpoint}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Error al cargar ${itemType}s.`);
    }

    return data;
  } catch (error) {
    throw new Error("No se pudo conectar con el servidor.");
  }
};

// Realizar compra
export const comprarItem = async (itemType, itemId) => {
  try {
    const response = await fetch(`${API_URL}/game/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: itemType,
        id: itemId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al realizar la compra.");
    }

    return result.message;
  } catch (error) {
    throw new Error("No se pudo conectar con el servidor.");
  }
};

// Obtener evento aleatorio
export const obtenerEventoAleatorio = async () => {
  try {
    const response = await fetch(`${API_URL}/game/random_event`);
    if (!response.ok) {
      throw new Error("Error en la solicitud al API");
    }
    return await response.json();
  } catch (error) {
    throw new Error("No se pudo conectar con el servidor");
  }
};