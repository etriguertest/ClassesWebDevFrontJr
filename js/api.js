// js/api.js — Servicio de red asíncrono
import CONFIG from './config.js';

export const obtenerPersonajes = async (pagina = 1) => {
  try {
    const respuesta = await fetch(`${CONFIG.urlApi}?page=${pagina}`);
    
    if (!respuesta.ok) {
      throw new Error(
        `El servidor respondió con error (código ${respuesta.status})`
      );
    }
    
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error en obtenerPersonajes:', error.message);
    throw error;
  }
};