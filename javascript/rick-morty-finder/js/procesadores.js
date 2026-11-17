// Regla: aquí NO se toca el DOM.

// Convierte texto externo en texto seguro para usar con innerHTML
export const escaparHTML = (texto) => String(texto)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Devuelve la clase de color de Bootstrap según el estado
export const claseEstado = (status) => {
  if (status === 'Alive') {
    return 'bg-success';
  } else if (status === 'Dead') {
    return 'bg-danger';
  }
  return 'bg-secondary';
};

// map: transforma cada personaje en el HTML de su tarjeta
// Reto 1: "favorito" con valor por defecto + botón ⭐
// Reto 4: botón "Ver ficha"
export const transformarEnTarjetas = (personajes) => personajes
  .map(({ id, name, status, species, image, origin, favorito = false }) => `
    <div class="col" data-id="${id}">
      <div class="card h-100 bg-secondary bg-opacity-25 border-secondary">
        <img src="${escaparHTML(image)}" class="card-img-top"
             alt="${escaparHTML(name)}" loading="lazy">
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
  `)
  .join('');

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

// Reto 1: map + spread → lista NUEVA con ese personaje invertido
export const alternarFavorito = (personajes, id) => {
  return personajes.map((personaje) => {
    if (personaje.id === Number(id)) {
      return { ...personaje, favorito: !personaje.favorito };
    }
    return personaje;
  });
};

// Reto 1 (extra): al cambiar de página se vuelven a marcar los favoritos
// guardados, usando .includes() sobre una lista de ids
export const marcarFavoritos = (personajes, idsFavoritos) =>
  personajes.map((personaje) => ({
    ...personaje,
    favorito: idsFavoritos.includes(personaje.id)
  }));

// Reto 2: dos .filter() encadenados (nombre Y estado a la vez)
export const filtrarPersonajesCombinado = (lista, texto, estado) => {
  const termino = texto.toLowerCase().trim();
  return lista
    .filter(({ name }) => name.toLowerCase().includes(termino))
    .filter(({ status }) => estado === 'todos' || status === estado);
};
