// js/main.js — Coordinador principal: manipulación del DOM y orquestación
import { obtenerPersonajes } from './api.js';
import {
  transformarEnTarjetas,
  existeConEstado,
  filtrarPersonajesCombinado,
  buscarPorId,
  alternarFavorito,
  marcarFavoritos,
  escaparHTML
} from './procesadores.js';

// ===== Estado en memoria =====
let personajesGlobales = [];
let favoritosIds = [];
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

// ===== Paginación y control de errores =====
const actualizarPaginacion = (cargando) => {
  indicadorPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
  btnAnterior.disabled = cargando || paginaActual === 1;
  btnSiguiente.disabled = cargando || paginaActual === totalPaginas;
};

const mensajeAmigable = (error) => {
  if (error.message.includes('Failed to fetch')) {
    return 'Sin conexión: revisa tu internet e inténtalo de nuevo.';
  }
  return error.message;
};

// ===== Control de Estados Visuales =====
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

const mostrarError = (mensaje) => {
  textoError.textContent = mensaje;
  alertaError.classList.remove('d-none');
  contenedor.innerHTML = '';
  resumen.textContent = '';
};

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

// ===== Filtros Combinados =====
const ejecutarFiltros = () => {
  const estado = selectEstado.value;
  const filtrados = filtrarPersonajesCombinado(
    personajesGlobales,
    inputBusqueda.value,
    estado
  );

  pintarPersonajes(filtrados);

  let texto = `Mostrando ${filtrados.length} de ${personajesGlobales.length}`;
  if (estado !== 'todos' && !existeConEstado(personajesGlobales, estado)) {
    texto = `${texto} · ⚠️ En esta lista no hay personajes con estado ${estado}`;
  }
  resumen.textContent = texto;
};

// ===== Gestión de Favoritos =====
const actualizarContador = () => {
  contadorFavoritos.textContent = `⭐ Favoritos: ${favoritosIds.length}`;
};

const manejarFavorito = (id) => {
  const anterior = personajesGlobales;
  personajesGlobales = alternarFavorito(personajesGlobales, id);
  
  ejecutarFiltros();

  const personaje = buscarPorId(personajesGlobales, id);
  if (personaje.favorito) {
    favoritosIds = [...favoritosIds, personaje.id];
  } else {
    favoritosIds = favoritosIds.filter((idGuardado) => idGuardado !== personaje.id);
  }

  console.log('¿Arreglo nuevo?', anterior !== personajesGlobales);
  actualizarContador();
};

// ===== Modal Ficha Técnica =====
const abrirFicha = (id) => {
  const personaje = buscarPorId(personajesGlobales, id);
  if (!personaje) return;

  const {
    name,
    image,
    status,
    species,
    origin,
    gender = 'Sin dato',
    episode = []
  } = personaje;

  modalNombre.textContent = name;
  modalCuerpo.innerHTML = `
    <img src="${escaparHTML(image)}" class="img-fluid rounded mb-3" alt="${escaparHTML(name)}">
    <p class="mb-1"><strong>Estado:</strong> ${escaparHTML(status)}</p>
    <p class="mb-1"><strong>Especie:</strong> ${escaparHTML(species)}</p>
    <p class="mb-1"><strong>Origen:</strong> ${escaparHTML(origin.name)}</p>
    <p class="mb-1"><strong>Género:</strong> ${escaparHTML(gender)}</p>
    <p class="mb-0"><strong>Episodios:</strong> ${episode.length}</p>
  `;

  bootstrap.Modal.getOrCreateInstance(modalDetalle).show();
};

// ===== Carga de Datos por Página =====
const cargarPagina = async (pagina) => {
  alternarCarga(true);
  try {
    const { info, results } = await obtenerPersonajes(pagina);
    personajesGlobales = marcarFavoritos(results, favoritosIds);
    paginaActual = pagina;
    totalPaginas = info.pages;
    ejecutarFiltros();
  } catch (error) {
    mostrarError(mensajeAmigable(error));
  } finally {
    alternarCarga(false);
  }
};

// ===== Listeners de Eventos =====
selectEstado.addEventListener('change', ejecutarFiltros);
inputBusqueda.addEventListener('input', ejecutarFiltros);
btnAnterior.addEventListener('click', () => cargarPagina(paginaActual - 1));
btnSiguiente.addEventListener('click', () => cargarPagina(paginaActual + 1));
btnCargar.addEventListener('click', () => cargarPagina(paginaActual));
btnReintentar.addEventListener('click', () => cargarPagina(paginaActual));

// Delegación de eventos en el contenedor dinámico
contenedor.addEventListener('click', (evento) => {
  const tarjeta = evento.target.closest('[data-id]');
  if (!tarjeta) return;

  const id = tarjeta.dataset.id;
  if (evento.target.closest('.btn-favorito')) {
    manejarFavorito(id);
  } else if (evento.target.closest('.btn-detalle')) {
    abrirFicha(id);
  }
});

// ===== Inicio de la Aplicación =====
actualizarContador();
cargarPagina(1);