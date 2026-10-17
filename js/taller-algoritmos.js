/**
 * TALLER DE ALGORITMOS EN JAVASCRIPT (VERSIÓN WEB)
 * ------------------------------------------------
 * Archivo: js/taller-algoritmos.js
 */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================================
  // DESAFÍO 1: AÑO BISIESTO
  // ============================================================================
  
  let formBisiesto = document.getElementById('form-bisiesto');
  let inputAnio = document.getElementById('inputAnio');
  let resultadoD1 = document.getElementById('resultado-d1');

  /**
   * Determina si un año es bisiesto.
   */
  function esBisiesto(anio) {
    if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
      return true;
    } else {
      return false;
    }
  }

  formBisiesto.addEventListener('submit', function (event) {
    event.preventDefault();
    let anio = parseInt(inputAnio.value);

    if (isNaN(anio)) return;

    let bisiesto = esBisiesto(anio);
    resultadoD1.classList.remove('d-none');

    if (bisiesto) {
      resultadoD1.className = 'alert alert-success mt-4';
      resultadoD1.innerHTML = `<strong>✅ El año ${anio} ES bisiesto.</strong><br><small>Es divisible por 4 y cumple la regla del calendario gregoriano.</small>`;
    } else {
      resultadoD1.className = 'alert alert-danger mt-4';
      resultadoD1.innerHTML = `<strong>❌ El año ${anio} NO es bisiesto.</strong><br><small>No cumple con las condiciones para tener 366 días.</small>`;
    }
  });


  // ============================================================================
  // DESAFÍO 2: NÚMERO MÁS GRANDE (10 NÚMEROS)
  // ============================================================================

  let containerInputs = document.getElementById('inputs-numeros-container');
  let formMayor = document.getElementById('form-mayor');
  let btnAutollenar = document.getElementById('btn-autollenar');
  let resultadoD2 = document.getElementById('resultado-d2');

  // Generar dinámicamente los 10 campos de entrada
  for (let i = 1; i <= 10; i++) {
    let col = document.createElement('div');
    col.className = 'col-6 col-md-3 col-lg-2.4';
    col.innerHTML = `
      <div class="form-floating input-num-card">
        <input type="number" class="form-control num-input" id="num-${i}" placeholder="N° ${i}" step="any" required>
        <label for="num-${i}">Número ${i}</label>
      </div>
    `;
    containerInputs.appendChild(col);
  }

  /**
   * Encuentra el número de mayor valor en un arreglo.
   */
  function obtenerNumeroMayor(numeros) {
    let mayor = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
      if (numeros[i] > mayor) {
        mayor = numeros[i];
      }
    }
    return mayor;
  }

  btnAutollenar.addEventListener('click', function () {
    let inputs = document.querySelectorAll('.num-input');
    inputs.forEach(function (input) {
      input.value = Math.floor(Math.random() * 200) - 50; // Números entre -50 y 150
    });
  });

  formMayor.addEventListener('submit', function (event) {
    event.preventDefault();
    let inputs = document.querySelectorAll('.num-input');
    let listaNumeros = [];

    inputs.forEach(function (input) {
      listaNumeros.push(parseFloat(input.value));
    });

    let mayor = obtenerNumeroMayor(listaNumeros);

    resultadoD2.classList.remove('d-none');
    resultadoD2.className = 'alert alert-info mt-4';
    resultadoD2.innerHTML = `
      <h5 class="alert-heading fw-bold">🌟 Resultado:</h5>
      <p class="mb-1">El número más grande ingresado es: <strong>${mayor}</strong></p>
      <hr>
      <small class="text-muted">Lista completa de números: [ ${listaNumeros.join(', ')} ]</small>
    `;
  });


  // ============================================================================
  // DESAFÍO 3: JUEGO DE ADIVINANZA
  // ============================================================================

  let panelInicio = document.getElementById('panel-juego-inicio');
  let panelActivo = document.getElementById('panel-juego-activo');
  let btnIniciar = document.getElementById('btn-iniciar-juego');
  let btnReiniciar = document.getElementById('btn-reiniciar-juego');
  let formAdivinar = document.getElementById('form-adivinar');
  let inputGuess = document.getElementById('inputGuess');
  let intentosSpan = document.getElementById('intentos-restantes');
  let historial = document.getElementById('historial-intentos');
  let resultadoD3 = document.getElementById('resultado-d3');

  let numeroSecreto = 0;
  let intentosRestantes = 5;
  let juegoTerminado = false;

  function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentosRestantes = 5;
    juegoTerminado = false;

    intentosSpan.textContent = intentosRestantes;
    historial.innerHTML = '';
    resultadoD3.classList.add('d-none');
    inputGuess.value = '';
    inputGuess.disabled = false;

    panelInicio.classList.add('d-none');
    panelActivo.classList.remove('d-none');
    inputGuess.focus();
  }

  btnIniciar.addEventListener('click', iniciarJuego);
  btnReiniciar.addEventListener('click', iniciarJuego);

  formAdivinar.addEventListener('submit', function (event) {
    event.preventDefault();
    if (juegoTerminado) return;

    let guess = parseInt(inputGuess.value);
    if (isNaN(guess) || guess < 1 || guess > 100) return;

    intentosRestantes--;
    intentosSpan.textContent = intentosRestantes;

    let item = document.createElement('div');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';

    if (guess === numeroSecreto) {
      item.classList.add('list-group-item-success');
      item.innerHTML = `<span>🎯 Propaste <strong>${guess}</strong></span> <span class="badge bg-success">¡CORRECTO!</span>`;
      historial.prepend(item);

      resultadoD3.classList.remove('d-none');
      resultadoD3.className = 'alert alert-success mt-3';
      resultadoD3.innerHTML = `🎉 <strong>¡Felicidades!</strong> Adivinaste el número secreto (${numeroSecreto}).`;

      juegoTerminado = true;
      inputGuess.disabled = true;
    } else if (guess < numeroSecreto) {
      item.classList.add('list-group-item-warning');
      item.innerHTML = `<span>Propaste <strong>${guess}</strong></span> <span class="badge bg-warning text-dark">💡 El número es MÁS ALTO</span>`;
      historial.prepend(item);
    } else {
      item.classList.add('list-group-item-warning');
      item.innerHTML = `<span>Propaste <strong>${guess}</strong></span> <span class="badge bg-warning text-dark">💡 El número es MÁS BAJO</span>`;
      historial.prepend(item);
    }

    if (intentosRestantes === 0 && !juegoTerminado) {
      juegoTerminado = true;
      inputGuess.disabled = true;

      resultadoD3.classList.remove('d-none');
      resultadoD3.className = 'alert alert-danger mt-3';
      resultadoD3.innerHTML = `❌ <strong>Agotaste tus 5 intentos.</strong> El número secreto era <strong>${numeroSecreto}</strong>.`;
    }

    inputGuess.value = '';
    inputGuess.focus();
  });

});