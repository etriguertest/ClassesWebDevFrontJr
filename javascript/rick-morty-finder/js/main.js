import { obtenerPersonajes } from './api.js';
import {
  transformarEnTarjetas,
  buscarPorId,
  existeConEstado,
  escaparHTML,
  alternarFavorito,
  marcarFavoritos,
  filtrarPersonajesCombinado
} from './procesadores.js';

// ===== Estado en memoria =====
let personajesGlobales = [];   // personajes de la página actual
let favoritosIds = [];         // ids favoritos (se conservan entre páginas)
let paginaActual = 1;
let totalPaginas = 1;

// ===== Referencias al DOM =====
const contenedor = document.getElementById('contenedor-tarjetas');
const spinner = document.getElementById('loading');
const alertaError = document.getElementById('alerta-error');
const textoError = document.getElementById('error-mensaje');
const btnCargar = document.getElementById('btn-cargar');
const btnReintentar = document.getElementById('btn-reintentar');
const selectEstado = document.getElementById('select-estado');
const inputBusqueda = document.getElementById('input-busqueda');
const resumen = document.getElementById('resumen');
const contadorFavoritos = document.getElementById('contador-favoritos');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const indicadorPagina = document.getElementById('indicador-pagina');
const modalDetalle = document.getElementById('modal-detalle');
const modalNombre = document.getElementById('modal-nombre');
const modalCuerpo = document.getElementById('modal-cuerpo');

// ===== Reto 3: paginación y mensajes de error =====
const actualizarPaginacion = (cargando) => {
  indicadorPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
  btnAnterior.disabled = cargando || paginaActual === 1;
  btnSiguiente.disabled = cargando || paginaActual === totalPaginas;
};

const mensajeAmigable = (error) => {
  if (error.message.includes('Failed to fetch')) {
    return 'Sin conexión: revisa tu internet e inténtalo de nuevo.';
  }
  return error.message;   // ya viene claro desde api.js (código HTTP)
};

// ===== Los tres estados de la pantalla =====
// Estado: cargando
const alternarCarga = (cargando) => {
  if (cargando) {
    spinner.classList.remove('d-none');
    contenedor.innerHTML = '';
    alertaError.classList.add('d-none');
  } else {
    spinner.classList.add('d-none');
  }
  btnCargar.disabled = cargando;
  actualizarPaginacion(cargando);
};

// Estado: error
const mostrarError = (mensaje) => {
  textoError.textContent = mensaje;
  alertaError.classList.remove('d-none');
  contenedor.innerHTML = '';
  resumen.textContent = '';
};

// Estado: éxito (o "sin resultados")
const pintarPersonajes = (lista) => {
  alertaError.classList.add('d-none');

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="fs-4 text-warning">
          No se encontraron personajes en esta dimensión 🛸
        </p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = transformarEnTarjetas(lista);
};

// ===== Reto 2: filtros combinados =====
const ejecutarFiltros = () => {
  const estado = selectEstado.value;
  const filtrados = filtrarPersonajesCombinado(
    personajesGlobales,
    inputBusqueda.value,
    estado
  );
  pintarPersonajes(filtrados);

  let texto = `Mostrando ${filtrados.length} de ${personajesGlobales.length}`;
  // .some(): ¿existe ese estado en la lista cargada?
  if (estado !== 'todos' && !existeConEstado(personajesGlobales, estado)) {
    texto = `${texto} · ⚠️ En esta lista no hay personajes con estado ${estado}`;
  }
  resumen.textContent = texto;
};

// ===== Carga de datos (Reto 3: por página) =====
const cargarPagina = async (pagina) => {
  alternarCarga(true);
  try {
    const { info, results } = await obtenerPersonajes(pagina);
    personajesGlobales = marcarFavoritos(results, favoritosIds);
    // Solo se actualizan si la petición tuvo éxito
    paginaActual = pagina;
    totalPaginas = info.pages;
    ejecutarFiltros();
  } catch (error) {
    mostrarError(mensajeAmigable(error));
  } finally {
    // finally corre SIEMPRE: apaga el spinner con éxito o con fallo
    alternarCarga(false);
  }
};

// ===== Reto 1: favoritos =====
const actualizarContador = () => {
  contadorFavoritos.textContent = `⭐ Favoritos: ${favoritosIds.length}`;
};

const manejarFavorito = (id) => {
  const anterior = personajesGlobales;
  personajesGlobales = alternarFavorito(personajesGlobales, id);

  // Recordamos el favorito por id (sin mutar: spread / filter)
  const personaje = buscarPorId(personajesGlobales, id);
  if (personaje.favorito) {
    favoritosIds = [...favoritosIds, personaje.id];
  } else {
    favoritosIds = favoritosIds.filter((idGuardado) => idGuardado !== personaje.id);
  }

  // Comprobación de inmutabilidad: debe ser true (arreglo nuevo)
  console.log('¿Arreglo nuevo?', anterior !== personajesGlobales);

  ejecutarFiltros();   // repinta SIN perder el filtro activo
  actualizarContador();
};

// ===== Reto 4: ficha técnica en un modal =====
const abrirFicha = (id) => {
  const personaje = buscarPorId(personajesGlobales, id);   // .find()
  if (!personaje) {
    return;
  }

  // Desestructuración con valores por defecto (gender y episode no siempre vienen)
  const { name, image, status, species, origin,
    gender = 'Sin dato', episode = [] } = personaje;

  modalNombre.textContent = name;
  modalCuerpo.innerHTML = `
    <img src="${escaparHTML(image)}" class="img-fluid rounded mb-3"
         alt="${escaparHTML(name)}">
    <p class="mb-1"><strong>Estado:</strong> ${escaparHTML(status)}</p>
    <p class="mb-1"><strong>Especie:</strong> ${escaparHTML(species)}</p>
    <p class="mb-1"><strong>Origen:</strong> ${escaparHTML(origin.name)}</p>
    <p class="mb-1"><strong>Género:</strong> ${escaparHTML(gender)}</p>
    <p class="mb-0"><strong>Episodios:</strong> ${episode.length}</p>
  `;

  bootstrap.Modal.getOrCreateInstance(modalDetalle).show();
};

// ===== Eventos =====
// Un solo listener en el contenedor (delegación): decide qué botón fue
contenedor.addEventListener('click', (evento) => {
  const tarjeta = evento.target.closest('[data-id]');
  if (!tarjeta) {
    return;
  }

  const id = tarjeta.dataset.id;
  if (evento.target.closest('.btn-favorito')) {
    manejarFavorito(id);
  } else if (evento.target.closest('.btn-detalle')) {
    abrirFicha(id);
  }
});

selectEstado.addEventListener('change', ejecutarFiltros);
inputBusqueda.addEventListener('input', ejecutarFiltros);

btnAnterior.addEventListener('click', () => cargarPagina(paginaActual - 1));
btnSiguiente.addEventListener('click', () => cargarPagina(paginaActual + 1));
btnCargar.addEventListener('click', () => cargarPagina(paginaActual));
btnReintentar.addEventListener('click', () => cargarPagina(paginaActual));

// ===== Arranque =====
actualizarContador();
cargarPagina(1);


// btnAnterior.addEventListener('click', () => {
//     if(paginaActual > 1) cargarPagina(paginaActual - 1);
// })