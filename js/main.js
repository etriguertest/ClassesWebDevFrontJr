// js/main.js — Coordinador principal: el único archivo que interactúa con el DOM
import { obtenerPersonajes } from './api.js';
import { filtrarPorEstado, filtrarPorNombre } from './procesadores.js';

// Elementos del DOM
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const loadingSpinner = document.getElementById('loading');
const alertaError = document.getElementById('alerta-error');
const errorMensaje = document.getElementById('error-mensaje');
const inputBusqueda = document.getElementById('input-busqueda');
const selectEstado = document.getElementById('select-estado');
const btnCargar = document.getElementById('btn-cargar');

// Estado local de los datos
let todosLosPersonajes = [];

// Sanitización de entradas para prevención de ataques XSS (Seguridad)
const escaparHTML = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// badges estéticos según el estado del personaje
const obtenerBadgeEstado = (status) => {
  if (status === 'Alive') return 'bg-success';
  if (status === 'Dead') return 'bg-danger';
  return 'bg-secondary';
};

// Renderizado de las tarjetas en el DOM
const renderizarTarjetas = (personajes) => {
  if (personajes.length === 0) {
    contenedorTarjetas.innerHTML = `
      <div class="col-12 text-center py-4 text-secondary">
        <p class="fs-5 mb-0">No se encontraron personajes que coincidan con los filtros.</p>
      </div>
    `;
    return;
  }

  contenedorTarjetas.innerHTML = personajes
    .map(({ id, name, status, species, image, origin }) => `
      <div class="col">
        <div class="card h-100 bg-secondary bg-opacity-10 border-secondary shadow-sm" data-id="${id}">
          <img src="${image}" class="card-img-top" alt="${escaparHTML(name)}" loading="lazy">
          <div class="card-body">
            <h5 class="card-title text-success fw-bold mb-2">${escaparHTML(name)}</h5>
            <p class="card-text mb-1">
              <span class="badge ${obtenerBadgeEstado(status)}">${escaparHTML(status)}</span>
              <span class="text-secondary ms-1">• ${escaparHTML(species)}</span>
            </p>
            <p class="card-text small text-secondary">
              <strong>Origen:</strong> ${escaparHTML(origin.name)}
            </p>
          </div>
        </div>
      </div>
    `)
    .join('');
};

// Aplicación combinada de los filtros en tiempo real
const aplicarFiltros = () => {
  const estado = selectEstado.value;
  const texto = inputBusqueda.value;

  const porEstado = filtrarPorEstado(todosLosPersonajes, estado);
  const resultadoFinal = filtrarPorNombre(porEstado, texto);

  renderizarTarjetas(resultadoFinal);
};

// Carga inicial y manejo de los 3 estados (Cargando, Éxito, Error)
const cargarDatos = async () => {
  // Estado 1: Cargando
  loadingSpinner.classList.remove('d-none');
  alertaError.classList.add('d-none');
  contenedorTarjetas.innerHTML = '';

  try {
    todosLosPersonajes = await obtenerPersonajes();
    // Estado 3: Éxito
    aplicarFiltros();
  } catch (error) {
    // Estado 2: Error
    errorMensaje.textContent = error.message || 'No se pudo conectar con la Ciudadela.';
    alertaError.classList.remove('d-none');
  } finally {
    loadingSpinner.classList.add('d-none');
  }
};

// Listeners de eventos
inputBusqueda.addEventListener('input', aplicarFiltros);
selectEstado.addEventListener('change', aplicarFiltros);
btnCargar.addEventListener('click', cargarDatos);

// Delegación de eventos en las tarjetas
contenedorTarjetas.addEventListener('click', (evento) => {
  const tarjeta = evento.target.closest('[data-id]');
  if (!tarjeta) return;

  const personajeId = tarjeta.dataset.id;
  console.log(`Clic registrado en la tarjeta del personaje con ID: ${personajeId}`);
});

// Inicialización
cargarDatos();