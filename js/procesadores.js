// js/procesadores.js — Funciones puras (sin manipulación del DOM)

export const escaparHTML = (texto) =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const claseEstado = (status) => {
  if (status === 'Alive') return 'bg-success';
  if (status === 'Dead') return 'bg-danger';
  return 'bg-secondary';
};

export const transformarEnTarjetas = (personajes) =>
  personajes
    .map(
      ({ id, name, status, species, image, origin, favorito = false }) => `
      <div class="col" data-id="${id}">
        <div class="card h-100 bg-secondary bg-opacity-25 border-secondary card-personaje">
          <img 
            src="${escaparHTML(image)}" 
            class="card-img-top" 
            alt="${escaparHTML(name)}" 
            loading="lazy"
            decoding="async"
            width="300"
            height="300"
          >
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

export const existeConEstado = (personajes, estado) =>
  personajes.some(({ status }) => status === estado);

export const filtrarPersonajesCombinado = (lista, texto, estado) => {
  const termino = texto.toLowerCase().trim();
  return lista
    .filter(({ name }) => name.toLowerCase().includes(termino))
    .filter(({ status }) => estado === 'todos' || status === estado);
};

export const buscarPorId = (personajes, id) =>
  personajes.find((personaje) => personaje.id === Number(id));

export const alternarFavorito = (personajes, id) => {
  return personajes.map((personaje) => {
    if (personaje.id === Number(id)) {
      return { ...personaje, favorito: !personaje.favorito };
    }
    return personaje;
  });
};

export const marcarFavoritos = (personajes, idsFavoritos) =>
  personajes.map((personaje) => ({
    ...personaje,
    favorito: idsFavoritos.includes(personaje.id)
  }));