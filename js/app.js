// ============================================================================
// GHOSTNET V2 TERMINAL ENGINE — AGENTES Y MISIONES
// ============================================================================

// 1. Catálogo global de misiones por especialidad
const MISIONES_DISPONIBLES = [
  // FrontEnd
  { id: 'M-201', titulo: 'Maquetado HTML5/CSS3 Responsivo', especialidad: 'FrontEnd' },
  { id: 'M-202', titulo: 'Manipulación DOM y Funciones Flecha', especialidad: 'FrontEnd' },
  { id: 'M-203', titulo: 'Arquitectura de Componentes React', especialidad: 'FrontEnd' },
  { id: 'M-204', titulo: 'Optimización de Renderizado Web', especialidad: 'FrontEnd' },

  // Balística
  { id: 'M-301', titulo: 'Análisis de Impacto de Proyectiles', especialidad: 'Balística' },
  { id: 'M-302', titulo: 'Calibración de Armamento Pesado', especialidad: 'Balística' },
  { id: 'M-303', titulo: 'Peritaje Balístico Forense', especialidad: 'Balística' },
  { id: 'M-304', titulo: 'Cálculo de Trayectoria de Largo Alcance', especialidad: 'Balística' },

  // Infiltración
  { id: 'M-103', titulo: 'Infiltración en Embajada Secreta', especialidad: 'Infiltración' },
  { id: 'M-104', titulo: 'Extracción de Agente Doble', especialidad: 'Infiltración' },
  { id: 'M-108', titulo: 'Reconocimiento Urbano Nocturno', especialidad: 'Infiltración' },

  // Ciberdefensa
  { id: 'M-105', titulo: 'Inhibición de Firewall Central', especialidad: 'Ciberdefensa' },
  { id: 'M-106', titulo: 'Limpieza de Malware en Red', especialidad: 'Ciberdefensa' },
  { id: 'M-109', titulo: 'Parche de Vulnerabilidad Zero-Day', especialidad: 'Ciberdefensa' }
];

// 2. Arreglo inicial: Cada agente inicia con 1 sola misión asignada por defecto
let redDeAgentes = [
  {
    codenom: 'COACH',
    especialidad: 'FrontEnd',
    rango: 'Elite',
    destino: 'Kodigo',
    peligro: 0,
    misiones: [
      { id: 'M-201', titulo: 'Maquetado HTML5/CSS3 Responsivo', especialidad: 'FrontEnd' }
    ]
  },
  {
    codenom: 'ERICK',
    especialidad: 'Balística',
    rango: 'Elite',
    destino: 'Haití',
    peligro: 100,
    misiones: [
      { id: 'M-301', titulo: 'Análisis de Impacto de Proyectiles', especialidad: 'Balística' }
    ]
  },
  {
    codenom: 'TITAN',
    especialidad: 'Infiltración',
    rango: 'Veterano',
    destino: 'Japón',
    peligro: 65,
    misiones: [
      { id: 'M-103', titulo: 'Infiltración en Embajada Secreta', especialidad: 'Infiltración' }
    ]
  },
  {
    codenom: 'BLADE',
    especialidad: 'Ciberdefensa',
    rango: 'Operativo',
    destino: 'México',
    peligro: 40,
    misiones: [
      { id: 'M-105', titulo: 'Inhibición de Firewall Central', especialidad: 'Ciberdefensa' }
    ]
  }
];

const CODENOMS_PROHIBIDOS = ['TRAIDOR', 'RENEGADO'];

// Mostrar avisos estilizados en la terminal
const mostrarAlertaTerminal = (mensaje, tipo = 'danger') => {
  const contenedorAlerta = document.getElementById('alerta-terminal');
  if (!contenedorAlerta) return;

  const esWarning = tipo === 'warning';
  const claseColor = esWarning ? 'alert-terminal-warning' : '';
  const icono = esWarning ? '⚠️' : '⛔';

  contenedorAlerta.className = `alert-terminal ${claseColor} d-flex justify-content-between align-items-center mb-4`;
  contenedorAlerta.innerHTML = `
    <div>
      <strong>${icono} SYSTEM LOG:</strong> ${escaparHTML(mensaje)}
    </div>
    <button type="button" class="btn-close btn-close-white btn-sm" id="btn-cerrar-alerta"></button>
  `;

  document.getElementById('btn-cerrar-alerta').addEventListener('click', () => {
    contenedorAlerta.classList.add('d-none');
  });

  clearTimeout(contenedorAlerta.timer);
  contenedorAlerta.timer = setTimeout(() => {
    contenedorAlerta.classList.add('d-none');
  }, 4000);
};

// Inyección de estructura HTML principal
const appRoot = document.getElementById('app-root');
appRoot.innerHTML = `
  <div class="row g-4">
    
    <!-- Columna 1: Expediente de Reclutamiento -->
    <div class="col-lg-3">
      <div class="card sidebar-recruitment p-3 shadow-sm">
        <h6 class="text-gold fw-bold mb-3">+ RECLUTAMIENTO</h6>
        
        <form id="form-reclutar">
          <div class="mb-3">
            <label for="input-codenom" class="form-label">Nombre Clave:</label>
            <input type="text" id="input-codenom" required class="form-control form-control-terminal" placeholder="Ej. ORION">
          </div>
          
          <div class="mb-3">
            <label for="input-especialidad" class="form-label">Especialidad táctica:</label>
            <input type="text" id="input-especialidad" required class="form-control form-control-terminal" placeholder="Ej. FrontEnd">
          </div>

          <div class="mb-3">
            <label for="input-destino" class="form-label">Destino asignado:</label>
            <input type="text" id="input-destino" required class="form-control form-control-terminal" placeholder="Ej. Kodigo">
          </div>
          
          <div class="mb-3">
            <label for="input-peligro" class="form-label">Nivel de amenaza (%):</label>
            <input type="number" id="input-peligro" min="0" max="100" required class="form-control form-control-terminal" placeholder="Ej. 0">
          </div>

          <div class="mb-3">
            <label for="select-rango" class="form-label">Rango asignado:</label>
            <select id="select-rango" class="form-select form-select-terminal">
              <option value="Operativo">Operativo</option>
              <option value="Veterano">Veterano</option>
              <option value="Elite">Elite</option>
            </select>
          </div>

          <button type="submit" class="btn btn-gold w-100 mb-2">
            Reclutar Agente
          </button>
        </form>

        <hr class="border-secondary my-3">
        
        <button id="btn-retirar" class="btn btn-outline-danger-custom w-100 btn-sm">
          Retirar Último
        </button>
      </div>
    </div>

    <!-- Columna 2: Agentes Desplegados -->
    <div class="col-lg-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0 text-light">Agentes Desplegados</h2>
        <span id="contador-agentes" class="badge badge-total">Total: 0</span>
      </div>

      <div id="lista-agentes" class="row g-3"></div>
    </div>

    <!-- Columna 3: Asignación de Misiones -->
    <div class="col-lg-4">
      <div class="card sidebar-recruitment p-3 shadow-sm border-warning">
        <h6 class="text-gold fw-bold mb-3">ASIGNACIÓN DE MISIONES</h6>
        
        <form id="form-asignar-mision">
          <div class="mb-3">
            <label for="select-agente-mision" class="form-label">Seleccionar Agente:</label>
            <select id="select-agente-mision" class="form-select form-select-terminal" required>
              <!-- Dinámico -->
            </select>
          </div>

          <div class="mb-3">
            <label for="select-mision" class="form-label">Misiones por Especialidad:</label>
            <select id="select-mision" class="form-select form-select-terminal" required>
              <option value="">-- Selecciona un agente primero --</option>
            </select>
          </div>

          <button type="submit" id="btn-asignar-mision" class="btn btn-gold w-100">
            Asignar Misión
          </button>
        </form>
      </div>
    </div>

  </div>
`;

// Sanitización contra XSS
const escaparHTML = (texto) => texto
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const claseRango = (rango) => {
  if (rango === 'Elite') return 'badge-elite';
  if (rango === 'Veterano') return 'badge-veterano';
  return 'badge-operativo';
};

const claseAmenaza = (peligro) => {
  if (peligro >= 80) return 'bg-danger text-white';
  if (peligro >= 50) return 'bg-warning text-dark';
  return 'bg-success text-white';
};

// Generador de plantilla HTML para tarjetas
const crearTarjetaAgente = (agente, indice) => {
  const misionesHTML = agente.misiones.length === 0
    ? `<p class="small text-muted mb-0 mt-2">Sin misiones activas.</p>`
    : `<div class="mt-2">
         <small class="text-gold fw-bold">Misiones Asignadas:</small>
         <div class="d-flex flex-column gap-1 mt-1">
           ${agente.misiones.map((mision, mIdx) => `
             <div class="item-mision p-2 d-flex justify-content-between align-items-center">
               <span class="text-light">
                 <strong>${mIdx + 1}.</strong> ${escaparHTML(mision.titulo)}
               </span>
               <button 
                 class="btn btn-outline-success btn-finalizada ms-2 btn-finalizar-mision"
                 data-codenom="${escaparHTML(agente.codenom)}"
                 data-mision-id="${mision.id}">
                 Finalizada
               </button>
             </div>
           `).join('')}
         </div>
       </div>`;

  return `
    <div class="col-12">
      <div class="card card-agente p-3 h-100">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h3 class="h6 text-gold mb-0 fw-bold">
            AGENTE #${indice + 1}: ${escaparHTML(agente.codenom)}
          </h3>
          <span class="badge ${claseRango(agente.rango)}">${agente.rango}</span>
        </div>
        
        <p class="small text-secondary mb-1">
          <strong class="text-light">Especialidad:</strong> ${escaparHTML(agente.especialidad)}
        </p>

        <p class="small text-secondary mb-2">
          <strong class="text-light">Destino:</strong> ${escaparHTML(agente.destino)}
        </p>

        <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary">
          <span class="small text-secondary">Nivel de amenaza:</span>
          <span class="badge ${claseAmenaza(agente.peligro)} fw-bold">${agente.peligro}%</span>
        </div>

        ${misionesHTML}
      </div>
    </div>
  `;
};

const listaAgentesContenedor = document.getElementById('lista-agentes');
const contadorAgentesTexto = document.getElementById('contador-agentes');
const selectAgenteMision = document.getElementById('select-agente-mision');
const selectMision = document.getElementById('select-mision');

const actualizarSelectorAgentes = () => {
  if (redDeAgentes.length === 0) {
    selectAgenteMision.innerHTML = `<option value="">-- No hay agentes --</option>`;
    selectMision.innerHTML = `<option value="">-- No hay misiones disponibles --</option>`;
    return;
  }

  selectAgenteMision.innerHTML = redDeAgentes.map((a) => `
    <option value="${escaparHTML(a.codenom)}">
      ${escaparHTML(a.codenom)} (${escaparHTML(a.especialidad)})
    </option>
  `).join('');

  actualizarSelectorMisiones();
};

const actualizarSelectorMisiones = () => {
  const codenomSeleccionado = selectAgenteMision.value;
  const agente = redDeAgentes.find((a) => a.codenom === codenomSeleccionado);

  if (!agente) {
    selectMision.innerHTML = `<option value="">-- Selecciona un agente --</option>`;
    return;
  }

  const idsMisionesAsignadas = agente.misiones.map((m) => m.id);
  const misionesDisponibles = MISIONES_DISPONIBLES.filter((m) => 
    m.especialidad.toLowerCase() === agente.especialidad.toLowerCase() &&
    !idsMisionesAsignadas.includes(m.id)
  );

  if (misionesDisponibles.length === 0) {
    selectMision.innerHTML = `<option value="">-- Sin misiones disponibles --</option>`;
  } else {
    selectMision.innerHTML = misionesDisponibles.map((m) => `
      <option value="${m.id}">${escaparHTML(m.titulo)}</option>
    `).join('');
  }
};

const renderizarRed = (agentes) => {
  let acumuladorHTML = '';
  for (let i = 0; i < agentes.length; i = i + 1) {
    acumuladorHTML = acumuladorHTML + crearTarjetaAgente(agentes[i], i);
  }
  listaAgentesContenedor.innerHTML = acumuladorHTML;
  contadorAgentesTexto.textContent = `Total: ${agentes.length}`;
  actualizarSelectorAgentes();
};

selectAgenteMision.addEventListener('change', actualizarSelectorMisiones);

// Reclutar Agente
document.getElementById('form-reclutar').addEventListener('submit', (evento) => {
  evento.preventDefault();

  const inputCodenom = document.getElementById('input-codenom');
  const inputEspecialidad = document.getElementById('input-especialidad');
  const inputDestino = document.getElementById('input-destino');
  const inputPeligro = document.getElementById('input-peligro');
  const selectRango = document.getElementById('select-rango');

  const codenom = inputCodenom.value.trim().toUpperCase();
  const especialidad = inputEspecialidad.value.trim();
  const destino = inputDestino.value.trim();
  const peligro = parseInt(inputPeligro.value);

  if (codenom === '' || especialidad === '' || destino === '' || isNaN(peligro)) {
    mostrarAlertaTerminal('Completa todos los campos obligatorios.', 'warning');
    return;
  }

  if (CODENOMS_PROHIBIDOS.includes(codenom)) {
    mostrarAlertaTerminal(`El nombre clave ${codenom} está prohibido en la red.`, 'danger');
    return;
  }

  const yaExiste = redDeAgentes.some((agente) => agente.codenom === codenom);
  if (yaExiste) {
    mostrarAlertaTerminal(`El nombre clave ${codenom} ya se encuentra registrado en la red.`, 'danger');
    return;
  }

  const nuevoAgente = {
    codenom,
    especialidad,
    destino,
    peligro,
    rango: selectRango.value,
    misiones: []
  };

  redDeAgentes = [...redDeAgentes, nuevoAgente];
  renderizarRed(redDeAgentes);

  document.getElementById('form-reclutar').reset();
  inputCodenom.focus();
});

// Asignar Misión
document.getElementById('form-asignar-mision').addEventListener('submit', (evento) => {
  evento.preventDefault();

  const codenomAgente = selectAgenteMision.value;
  const idMision = selectMision.value;

  const agente = redDeAgentes.find((a) => a.codenom === codenomAgente);

  if (!agente) {
    mostrarAlertaTerminal('Por favor, selecciona un agente válido.', 'warning');
    return;
  }

  const idsMisionesAsignadas = agente.misiones.map((m) => m.id);
  const misionesCompatibles = MISIONES_DISPONIBLES.filter((m) => 
    m.especialidad.toLowerCase() === agente.especialidad.toLowerCase() &&
    !idsMisionesAsignadas.includes(m.id)
  );

  if (!idMision || misionesCompatibles.length === 0) {
    mostrarAlertaTerminal('No existen misiones disponibles para el agente.', 'danger');
    return;
  }

  const misionAAsignar = MISIONES_DISPONIBLES.find((m) => m.id === idMision);

  redDeAgentes = redDeAgentes.map((a) => {
    if (a.codenom === codenomAgente) {
      return {
        ...a,
        misiones: [...a.misiones, misionAAsignar]
      };
    }
    return a;
  });

  renderizarRed(redDeAgentes);
});

// Finalizar Misión
listaAgentesContenedor.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('btn-finalizar-mision')) {
    const codenom = evento.target.getAttribute('data-codenom');
    const misionId = evento.target.getAttribute('data-mision-id');

    redDeAgentes = redDeAgentes.map((agente) => {
      if (agente.codenom === codenom) {
        return {
          ...agente,
          misiones: agente.misiones.filter((m) => m.id !== misionId)
        };
      }
      return agente;
    });

    renderizarRed(redDeAgentes);
  }
});

// Retirar Último Agente
document.getElementById('btn-retirar').addEventListener('click', () => {
  if (redDeAgentes.length === 0) {
    mostrarAlertaTerminal('No hay agentes en la red para retirar.', 'danger');
    return;
  }

  redDeAgentes = redDeAgentes.slice(0, redDeAgentes.length - 1);
  renderizarRed(redDeAgentes);
});

// Renderizado inicial
renderizarRed(redDeAgentes);