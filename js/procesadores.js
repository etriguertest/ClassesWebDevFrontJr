// js/procesadores.js — Funciones puras: reciben datos y devuelven datos.
// Regla: aquí NO se toca el DOM.

// filter: por estado ('todos' devuelve una copia de la lista completa)
export const filtrarPorEstado = (personajes, estado) => {
  if (estado === 'todos') {
    return [...personajes];
  }
  return personajes.filter(({ status }) => status === estado);
};

// filter: por coincidencia en el nombre (sin importar mayúsculas)
export const filtrarPorNombre = (personajes, texto) => {
  const termino = texto.toLowerCase().trim();
  return personajes.filter(({ name }) => name.toLowerCase().includes(termino));
};

// find: un personaje por id (el id puede llegar como texto)
export const buscarPorId = (personajes, id) => 
  personajes.find((personaje) => personaje.id === Number(id));

// some: ¿existe al menos un personaje con ese estado?
export const existeConEstado = (personajes, estado) => 
  personajes.some(({ status }) => status === estado);