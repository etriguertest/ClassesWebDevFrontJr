import CONFIG from './config.js';

// Reto 3: recibe la página (por defecto 1) y devuelve { info, results }
export const obtenerPersonajes = async (pagina = 1) => {
  try {
    // 1. await pausa ESTA función hasta que el servidor responda
    const respuesta = await fetch(`${CONFIG.urlApi}?page=${pagina}`);

    // 2. fetch solo falla por red caída: un 404 o 500 se revisa a mano
    if (!respuesta.ok) {
      throw new Error(
        `El servidor respondió con error (código ${respuesta.status})`
      );
    }

    // 3. .json() convierte el texto JSON en un objeto (también es async)
    const datos = await respuesta.json();

    // 4. Devolvemos todo: "info" (páginas) y "results" (personajes)
    return datos;
  } catch (error) {
    console.error('Error en obtenerPersonajes:', error.message);
    throw error;   // se relanza para que main.js muestre el error
  }
};
