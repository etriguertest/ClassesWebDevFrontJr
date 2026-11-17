// =============================================================================
// PROTOCOLO SOMBRA: PLANTILLA DE ENTRENAMIENTO PARA EL ALUMNO
// =============================================================================
// Instrucciones: Completa las funciones y los event listeners según los retos.
// No modifiques los nombres de las funciones provistas.

// -----------------------------------------------------------------------------
// SELECTORES GLOBALES
// Obtén las referencias necesarias del DOM aquí usando querySelector o getElementById
// -----------------------------------------------------------------------------
const terminal = document.querySelector('#terminal');
const btnAlerta = document.querySelector('#btn-alerta');
const badgeEstado = document.querySelector('#badge-estado');

const btnRevelar = document.querySelector('#btn-revelar');
const mensajeSecreto = document.querySelector('#mensaje-secreto');

const inputCredencial = document.querySelector('#input-credencial');
const feedbackClave = document.querySelector('#feedback-clave');

const formMision = document.querySelector('#form-mision');
const inputMision = document.querySelector('#input-mision');
const listaMisiones = document.querySelector('#lista-misiones');


// -----------------------------------------------------------------------------
// RETO 1 (40% DOM/Clases, 60% Evento Click): Estado de Alerta
// Nombre de función: conmutarAlerta
//
// ENUNCIADO:
// 1. Conmuta la clase 'alerta-roja' en el elemento 'terminal' usando .classList.toggle().
// 2. Comprueba si 'terminal' contiene la clase 'alerta-roja':
//    - Si la contiene, cambia el textContent de 'badgeEstado' a "ESTADO: ALERTA ROJA".
//    - Si no la contiene, cambia el textContent a "ESTADO: NORMAL".
// -----------------------------------------------------------------------------
function conmutarAlerta() {
    // [TU CÓDIGO AQUÍ]
    terminal.classList.toggle('alerta-roja');
    
    if (terminal.classList.contains('alerta-roja')) {
        badgeEstado.textContent = 'ESTADO: ALERTA ROJA';
    } else {
        badgeEstado.textContent = 'ESTADO: NORMAL';
    }
}

// Escuchador de evento Reto 1: Asocia el clic de 'btnAlerta' con 'conmutarAlerta'
btnAlerta.addEventListener('click', conmutarAlerta);


// -----------------------------------------------------------------------------
// RETO 2 (40% Clases, 60% Evento Click): Revelar / Ocultar Expediente
// Nombre de función: alternarMensajeSecreto
//
// ENUNCIADO:
// 1. Conmuta la clase 'oculto' en 'mensajeSecreto'. (listo)
// 2. Verifica si 'mensajeSecreto' contiene la clase 'oculto':
//    - Si está oculto, actualiza el textContent de 'btnRevelar' a "Revelar Archivo Clasificado".
//    - Si NO está oculto, actualiza el textContent de 'btnRevelar' a "Ocultar Archivo Clasificado".
// -----------------------------------------------------------------------------

function alternarMensajeSecreto() {
    // [TU CÓDIGO AQUÍ]
    mensajeSecreto.classList.toggle('oculto');
    if (mensajeSecreto.classList.contains('oculto')) {
        btnRevelar.textContent = "Revelar Archivo Clasificado";
    } else {
        btnRevelar.textContent = "Ocultar Archivo Clasificado";
    }
}

// Escuchador de evento Reto 2: Asocia el clic de 'btnRevelar' con 'alternarMensajeSecreto'
// [TU addEventListener AQUÍ]
btnRevelar.addEventListener('click', alternarMensajeSecreto);

// -----------------------------------------------------------------------------
// RETO 3 (40% Estilos/Texto, 60% Evento Input): Descifrador de Credenciales
// Nombre de función: verificarCredencial
//
// ENUNCIADO:
// 1. Lee el valor actual del campo mediante e.target.value.trim().
// 2. Si el valor es idéntico a "DELTA7":
//    - Asigna a 'feedbackClave' el texto "✅ Acceso Concedido: Nivel Director".
//    - Modifica feedbackClave.style.color a "#00ff9d".
// 3. De lo contrario, si el campo NO está vacío:
//    - Asigna el texto "❌ Clave Inválida / Monitoreando IP...".
//    - Modifica feedbackClave.style.color a "#ff3366".
// 4. Si el campo está vacío, deja el textContent en blanco "".
// -----------------------------------------------------------------------------
function verificarCredencial(evento) {
    // [TU CÓDIGO AQUÍ]
    const valorIngresado = evento.target.value.trim();
    //console.log(valorIngresado);
    if (valorIngresado === 'DELTA7') {
        //console.log('clave correcta'); 
        feedbackClave.textContent = "✅ Acceso Concedido: Nivel Director";
        feedbackClave.style.color = "#00ff9d";
    } else if (valorIngresado.length > 0) {
        feedbackClave.textContent = "❌ Clave Inválida / Monitoreando IP...";
        feedbackClave.style.color = "#ff4d4d";
    } else {
        //console.log('clave incorrecta');
        feedbackClave.textContent = "";
    }
}

// Escuchador de evento Reto 3: Asocia el evento 'input' de 'inputCredencial' con 'verificarCredencial'
// [TU addEventListener AQUÍ]
inputCredencial.addEventListener('input', verificarCredencial);

// -----------------------------------------------------------------------------
// RETO 4 (40% Creación de Elementos, 60% Evento Submit): Despacho de Misiones
// Nombre de función: registrarMision
//
// ENUNCIADO:
// 1. Detén el comportamiento predeterminado del formulario con evento.preventDefault().
// 2. Extrae el texto de 'inputMision' eliminando espacios exteriores (.trim()).
// 3. Valida: Si el texto está vacío, muestra un alert("Especifique una directiva válida") y sal de la función.
// 4. Si hay texto:
//    - Crea un elemento 'li' con document.createElement('li').
//    - Asígnale la clase 'item-mision' mediante .classList.add().
//    - Asigna el texto introducido al nuevo elemento.
//    - Agrégalo al final de 'listaMisiones' con .appendChild().
//    - Limpia el valor de 'inputMision' y devuélvele el foco con .focus().
// -----------------------------------------------------------------------------
function registrarMision(evento) {
    // [TU CÓDIGO AQUÍ]
    evento.preventDefault();

    const textoMision = inputMision.value.trim();
    
    if (!textoMision) {
        alert('Especifique una directiva válida');
        return;
    }

    const nuevaMision = document.createElement('li');
    //nuevaMision.classList.add('');
    nuevaMision.textContent = textoMision;
    nuevaMision.classList.add('item-mision');
    listaMisiones.appendChild(nuevaMision); //se la agrego al <ul>

    inputMision.value = '';
    inputMision.focus();

}

// Escuchador de evento Reto 4: Asocia el evento 'submit' de 'formMision' con 'registrarMision'
// [TU addEventListener AQUÍ]
//formMision.addEventListener('submit', (e) => {e.preventDefault();})
formMision.addEventListener('submit', registrarMision)