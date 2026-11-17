/*
  let agenteSecreto = { 
    codenom: 'PHANTOM',
    nombreReal: 'Elena Rostova',
    pais: 'Alemania',
    peligro: 85,
    activo: true };

    console.log(agenteSecreto.nombreReal)
 */

// Simulación de base de datos clasificada (Arreglo de Objetos Literales)
const AGENTES_SECRETOS = [
  { codenom: 'PHANTOM', nombreReal: 'Elena Rostova',
    pais: 'Rusia', peligro: 85, activo: true },
  { codenom: 'SPECTER', nombreReal: 'Marcus Vance',
    pais: 'Reino Unido', peligro: 40, activo: false },
  { codenom: 'MIRAGE', nombreReal: 'Kaelen Voss',
    pais: 'Japón', peligro: 95, activo: true },
  { codenom: 'RAVEN', nombreReal: 'Damian Cruz',
    pais: 'México', peligro: 60, activo: true }
];

// Capturamos el contenedor principal del DOM
const appRoot = document.getElementById('app-root');

appRoot.innerHTML = /*html*/ `
  <div class="row g-3 mb-4">
    <div class="col-md-8">
      <div class="btn-group" role="group">
        <button id="btn-todos" class="btn btn-outline-success">
          Todos los Agentes
        </button>
        <button id="btn-activos" class="btn btn-outline-warning">
          Solo en Activo
        </button>
      </div>
    </div>
    <div class="col-md-4 text-md-end">
      <button id="btn-auditoria" class="btn btn-danger">
        Calcular Riesgo Red
      </button>
    </div>
  </div>

  <div id="alerta-riesgo" class="mb-4"></div>

  <!-- Contenedor donde se imprimirán las tarjetas -->
  <div id="contenedor-tarjetas" class="row g-3"></div>
`;

// Función flecha con retorno implícito de template literal
// Transforma un objeto "agente" en un fragmento HTML (tarjeta de Bootstrap)
const crearTarjetaAgente = (agente) => /*html*/`
  <div class="col-md-6">
    <div class="card bg-dark border-secondary text-light h-100 shadow-sm">
      <div class="card-header border-secondary d-flex
                  justify-content-between align-items-center">
        <span class="text-success fw-bold">#${agente.codenom}</span>
        <span class="badge ${agente.activo ? 'bg-success' : 'bg-secondary'}">
          ${agente.activo ? 'ACTIVO' : 'RETIRADO'}
        </span>
      </div>
      <div class="card-body">
        <p class="card-text mb-1">
          <span class="text-secondary">Identidad:</span> ${agente.nombreReal}
        </p>
        <p class="card-text mb-1">
          <span class="text-secondary">Destino:</span> ${agente.pais}
        </p>
        <div class="d-flex align-items-center justify-content-between mt-3">
          <small class="text-secondary">Nivel de amenaza:</small>
          <span class="badge ${agente.peligro >= 80 ? 'bg-danger' : 'bg-info'}">
            ${agente.peligro}%
          </span>
        </div>
      </div>
    </div>
  </div>
`;

const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

// Función flecha que recibe una lista y una función callback que arma el diseño
const renderizarAgentes = (lista, plantillaCallback) => {
  let acumuladorHTML = '';

  // Recorremos la lista acumulando el HTML generado por el callback
  for (let i = 0; i < lista.length; i = i + 1) {
    acumuladorHTML = acumuladorHTML + plantillaCallback(lista[i]);
  }
  contenedorTarjetas.innerHTML = acumuladorHTML;
};


// Render inicial con todos los agentes:
renderizarAgentes(AGENTES_SECRETOS, crearTarjetaAgente);

// const plantillaAgente2 = (agente) => /*html*/`
//     <ul>
//         <li>Codenom: ${agente.codenom}</li>
//         <li>Nombre real: ${agente.nombreReal}</li>
//         <li>País: ${agente.pais}</li>
//         <li>Peligro: ${agente.peligro}</li>
//         <li>Activo: ${agente.activo}</li>
//     </ul>
// `;

// const renderizarUnAgente2 = (agente, plantilla) => {
//     contenedorTarjetas.innerHTML = plantillaAgente2(agente);
// }

// renderizarUnAgente2(AGENTES_SECRETOS[0], plantillaAgente2);

// Recibe una lista y un CRITERIO (callback que responde true o false)
const filtrarAgentes = (lista, criterioCallback) => {
  const resultado = [];
  for (let i = 0; i < lista.length; i = i + 1) {
    if (criterioCallback(lista[i])) {
      resultado.push(lista[i]);
    }
  }
  return resultado;
};

// Callback criterio con retorno implícito: ¿el agente está activo?
const estaActivo = (agente) => agente.activo;

// Recibe una lista y un EXTRACTOR (callback que devuelve el número a promediar)
const calcularPromedio = (lista, extractorCallback) => {
  if (lista.length === 0) {
    return 0;                       // evita dividir entre cero
  }

  let suma = 0;
  for (let i = 0; i < lista.length; i = i + 1) {
    suma = suma + extractorCallback(lista[i]);
  }
  return Math.round(suma / lista.length);
};

// Prueba de las funciones en consola
console.log(filtrarAgentes(AGENTES_SECRETOS, estaActivo).length);       // 3
console.log(calcularPromedio(AGENTES_SECRETOS, (a) => a.peligro));      // 70

// Botón "Solo en Activo"
document.getElementById('btn-activos').addEventListener('click', () => {
  const activos = filtrarAgentes(AGENTES_SECRETOS, estaActivo);
  renderizarAgentes(activos, crearTarjetaAgente);
});

// Botón "Todos los Agentes"
document.getElementById('btn-todos').addEventListener('click', () => {
  renderizarAgentes(AGENTES_SECRETOS, crearTarjetaAgente);
});

// Botón "Calcular Riesgo Red"
document.getElementById('btn-auditoria').addEventListener('click', () => {
  const promedio = calcularPromedio(
    AGENTES_SECRETOS,
    (agente) => agente.peligro
  );

  const alertaContenedor = document.getElementById('alerta-riesgo');
  alertaContenedor.innerHTML = /*html*/`
    <div class="alert alert-danger border-danger bg-danger
                bg-opacity-10 text-danger-emphasis mb-0" role="alert">
      ⚠️ <strong>AUDITORÍA DE RED COMPLETADA:</strong>
      Amenaza promedio global estimada en <strong>${promedio}%</strong>.
    </div>
  `;
});