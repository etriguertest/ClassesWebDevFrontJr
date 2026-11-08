// js/main.js — Coordinador: único archivo que toca el DOM
import { obtenerPersonajes } from './api.js';
import {
  transformarEnTarjetas,
  filtrarPorEstado,
  filtrarPorNombre,
  buscarPorId
} from './procesadores.js';

// Estado en memoria: los datos recibidos de la API
let personajesGlobales = [];

// Referencias al DOM
const contenedor = document.getElementById('contenedor-tarjetas');
const spinner = document.getElementById('loading');
const alertaError = document.getElementById('alerta-error');
const textoError = document.getElementById('error-mensaje');
const btnCargar = document.getElementById('btn-cargar');
const selectEstado = document.getElementById('select-estado');
const inputBusqueda = document.getElementById('input-busqueda');

// Estado: cargando
const alternarCarga = (cargando) => {
  if (cargando) {
    spinner.classList.remove('d-none');
    contenedor.innerHTML = '';
    alertaError.classList.add('d-none');
  } else {
    spinner.classList.add('d-none');
  }
};

// Estado: error
const mostrarError = (mensaje) => {
  textoError.textContent = mensaje;
  alertaError.classList.remove('d-none');
  contenedor.innerHTML = '';
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
      </div>`;
    return;
  }
  contenedor.innerHTML = transformarEnTarjetas(lista);
};

// Aplicación combinada de filtros (Estado + Búsqueda por Nombre)
const aplicarFiltros = () => {
  const estado = selectEstado.value;
  const texto = inputBusqueda.value;

  const porEstado = filtrarPorEstado(personajesGlobales, estado);
  const resultadoFinal = filtrarPorNombre(porEstado, texto);

  pintarPersonajes(resultadoFinal);
};

// Orquesta la carga: pide datos, guarda en memoria y pinta
const cargarApp = async () => {
  alternarCarga(true);
  try {
    personajesGlobales = await obtenerPersonajes();
    aplicarFiltros();
  } catch (error) {
    mostrarError(error.message);
  } finally {
    // finally corre SIEMPRE: apaga el spinner con éxito o con fallo
    alternarCarga(false);
  }
};

// Event Listeners
btnCargar.addEventListener('click', cargarApp);
selectEstado.addEventListener('change', aplicarFiltros);
inputBusqueda.addEventListener('input', aplicarFiltros);

// Un solo listener en el contenedor para la selección (delegación de eventos)
contenedor.addEventListener('click', (evento) => {
  const tarjeta = evento.target.closest('[data-id]');
  if (!tarjeta) {
    return;
  }
  const personaje = buscarPorId(personajesGlobales, tarjeta.dataset.id);
  console.log('Personaje seleccionado:', personaje);
});

// Carga inicial al abrir la aplicación
cargarApp();