// 1. Arreglo base de agentes (base de datos simulada)
let redDeAgentes = [
  { codenom: 'NOVA', especialidad: 'Criptografía', rango: 'Elite' },
  { codenom: 'TITAN', especialidad: 'Infiltración', rango: 'Veterano' },
  { codenom: 'BLADE', especialidad: 'Ciberdefensa', rango: 'Operativo' }
];

// Nombres clave vetados en la red (los usaremos con .includes())
const CODENOMS_PROHIBIDOS = ['TRAIDOR', 'RENEGADO'];

// 2. Inyección de la interfaz en el DOM
const appRoot = document.getElementById('app-root');

appRoot.innerHTML = /*html*/ `
    <div class="row g-4">
    <!-- Formulario de Reclutamiento -->
    <div class="col-lg-4">
      <div class="card bg-dark border-warning text-light shadow-sm">
        <div class="card-header border-warning text-warning fw-bold">
          ➕ EXPEDIENTE DE RECLUTAMIENTO
        </div>
        <div class="card-body">
          <form id="form-reclutar">
            <div class="mb-3">
              <label for="input-codenom"
                     class="form-label small text-secondary">
                Nombre Clave:
              </label>
              <input type="text" id="input-codenom" required
                     class="form-control bg-black text-light border-secondary"
                     placeholder="Ej. ORION">
            </div>
            <div class="mb-3">
              <label for="input-especialidad"
                     class="form-label small text-secondary">
                Especialidad táctica:
              </label>
              <input type="text" id="input-especialidad" required
                     class="form-control bg-black text-light border-secondary"
                     placeholder="Ej. Balística">
            </div>
            <div class="mb-3">
              <label for="select-rango"
                     class="form-label small text-secondary">
                Rango asignado:
              </label>
              <select id="select-rango"
                      class="form-select bg-black text-light border-secondary">
                <option value="Operativo">Operativo</option>
                <option value="Veterano">Veterano</option>
                <option value="Elite">Elite</option>
              </select>
            </div>
            <button type="submit" class="btn btn-warning w-100 fw-bold">
              Reclutar en la Red
            </button>
          </form>
          <hr class="border-secondary my-3">
          <button id="btn-retirar"
                  class="btn btn-outline-danger w-100 btn-sm">
            Retirar Último Agente
          </button>
        </div>
      </div>
    </div>

    <!-- Directorio Visual de Agentes Activos -->
    <div class="col-lg-8">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0 text-light">Agentes Desplegados</h2>
        <span id="contador-agentes" class="badge bg-secondary">Total: 0</span>
      </div>
      <div id="lista-agentes" class="row g-3"></div>
    </div>
  </div>
    `;

    // 3a. Escapa texto para mostrarlo de forma segura con innerHTML
const escaparHTML = (texto) => texto
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// 3b. Devuelve la clase de color de Bootstrap según el rango
const claseRango = (rango) => {
  if (rango === 'Elite') {
    return 'bg-danger';
  } else if (rango === 'Veterano') {
    return 'bg-warning text-dark';
  }
  return 'bg-info text-dark';
};

// 3c. Función flecha generadora de plantilla (retorno implícito)
const crearTarjetaAgente = (agente, indice) => /*html*/`
  <div class="col-md-6">
    <div class="card bg-dark border-secondary text-light h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h3 class="h6 text-warning mb-0">
            AGENTE #${indice + 1}: ${escaparHTML(agente.codenom)}
          </h3>
          <span class="badge ${claseRango(agente.rango)}">${agente.rango}</span>
        </div>
        <p class="small text-secondary mb-0">
          <strong class="text-light">Especialidad:</strong>
          ${escaparHTML(agente.especialidad)}
        </p>
      </div>
    </div>
  </div>
`;

// 4. Función de renderizado en el DOM
const listaAgentesContenedor = document.getElementById('lista-agentes');
const contadorAgentesTexto = document.getElementById('contador-agentes');

const renderizarRed = (agentes) => {
  let acumuladorHTML = '';
  for (let i = 0; i < agentes.length; i = i + 1) {
    acumuladorHTML = acumuladorHTML + crearTarjetaAgente(agentes[i], i);
  }
  listaAgentesContenedor.innerHTML = acumuladorHTML;
  contadorAgentesTexto.textContent = `Total: ${agentes.length}`;
};

// Render inicial con los agentes precargados:
renderizarRed(redDeAgentes);

// 5a. Compara el "antes" y el "después" de un cambio de datos
const reportarCambio = (anterior, nueva) => {
  console.log(`Antes: ${anterior.length} | Ahora: ${nueva.length}`);
  console.log('¿Misma referencia?', anterior === nueva);
  console.log('¿React detectaría el cambio?', anterior !== nueva);
};

// 5b. Manejador para el formulario de reclutamiento
const formularioReclutar = document.getElementById('form-reclutar');

formularioReclutar.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Evita que la página se recargue

  const inputCodenom = document.getElementById('input-codenom');
  const inputEspecialidad = document.getElementById('input-especialidad');
  const selectRango = document.getElementById('select-rango');

  const codenom = inputCodenom.value.trim().toUpperCase();
  const especialidad = inputEspecialidad.value.trim();

  // "required" acepta espacios en blanco: validamos DESPUÉS del trim()
  if (codenom === '' || especialidad === '') {
    alert('Completa el nombre clave y la especialidad.');
    return;
  }

  // .includes() consulta el arreglo sin modificarlo
  if (CODENOMS_PROHIBIDOS.includes(codenom)) {
    alert(`El nombre clave ${codenom} está prohibido en la red.`);
    return;
  }

  const nuevoAgente = {
    codenom: codenom,
    especialidad: especialidad,
    rango: selectRango.value
  };

  // REGLA DE ORO DE INMUTABILIDAD:
  // En vez de hacer redDeAgentes.push(nuevoAgente), creamos un nuevo arreglo:
  const redAnterior = redDeAgentes;
  redDeAgentes = [...redDeAgentes, nuevoAgente];
  reportarCambio(redAnterior, redDeAgentes);

  // Actualizamos la pantalla con el nuevo arreglo:
  renderizarRed(redDeAgentes);

  // Limpiamos los campos del formulario
  formularioReclutar.reset();
  inputCodenom.focus();
});

// 6. Manejador para retirar el último agente sin mutar con pop
const botonRetirar = document.getElementById('btn-retirar');

botonRetirar.addEventListener('click', () => {
  if (redDeAgentes.length === 0) {
    alert('No hay agentes en la red para retirar.');
    return;
  }

  // Todos los elementos excepto el último, usando slice (inmutable)
  const redAnterior = redDeAgentes;
  redDeAgentes = redDeAgentes.slice(0, redDeAgentes.length - 1);
  reportarCambio(redAnterior, redDeAgentes);

  // Volvemos a pintar la red actualizada
  renderizarRed(redDeAgentes);
});