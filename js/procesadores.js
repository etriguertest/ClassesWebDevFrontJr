// js/procesadores.js — Funciones puras (sin manipulación del DOM)

// Previene vulnerabilidades XSS sanitizando cadenas HTML
export const escaparHTML = (texto) =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Retorna clases CSS de Bootstrap según el estado del personaje
export const claseEstado = (status) => {
  if (status === 'Alive') {
    return 'bg-success';
  } else if (status === 'Dead') {
    return 'bg-danger';
  }
  return 'bg-secondary';
};

// Transforma una lista de personajes en elementos HTML formateados
export const transformarEnTarjetas = (personajes) =>
  personajes
    .map(
      ({ id, name, status, species, image, origin, favorito = false }) => `
      <div class="col" data-id="${id}">
        <div class="card h-100 bg-secondary bg-opacity-25 border-secondary">
          <img src="${escaparHTML(image)}" class="card-img-top" alt="${escaparHTML(name)}" loading="lazy">
          <div class="card-body d-flex flex-column">
            <h2 class="h5 card-title mb-1">${escaparHTML(name)}</h2>
            <div class="mb-2">
              <span class="badge ${claseEstado(status)}">
                ${escaparHTML(status)}
              </span>
              <span class="badge bg-dark border border-secondary">
                ${escaparHTML(species)}
              </span>
            </div>
            <p class="card-text text-secondary small mb-2">
              <strong>Origen:</strong> ${escaparHTML(origin.name)}
            </p>
            <div class="d-flex gap-2 mt-auto">
              <button class="btn btn-sm ${favorito ? 'btn-warning' : 'btn-outline-warning'} btn-favorito" aria-pressed="${favorito}">
                ${favorito ? '★ Favorito' : '☆ Marcar'}
              </button>
              <button class="btn btn-sm btn-outline-info btn-detalle">
                Ver ficha
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');

// Determina si existe al menos un elemento con el estado indicado (.some)
export const existeConEstado = (personajes, estado) =>
  personajes.some(({ status }) => status === estado);

// Filtra la lista aplicando búsqueda por texto y por estado simultáneamente
export const filtrarPersonajesCombinado = (lista, texto, estado) => {
  const termino = texto.toLowerCase().trim();
  return lista
    .filter(({ name }) => name.toLowerCase().includes(termino))
    .filter(({ status }) => estado === 'todos' || status === estado);
};

// Busca un personaje por ID dentro del arreglo (.find)
export const buscarPorId = (personajes, id) =>
  personajes.find((personaje) => personaje.id === Number(id));

// Invierte de forma inmutable la propiedad 'favorito' usando map + spread
export const alternarFavorito = (personajes, id) => {
  return personajes.map((personaje) => {
    if (personaje.id === Number(id)) {
      return { ...personaje, favorito: !personaje.favorito };
    }
    return personaje;
  });
};

// Sincroniza la lista devuelta por la API con el arreglo de IDs guardados como favoritos
export const marcarFavoritos = (personajes, idsFavoritos) =>
  personajes.map((personaje) => ({
    ...personaje,
    favorito: idsFavoritos.includes(personaje.id)
  }));