document.addEventListener('DOMContentLoaded', function () {
  let valorActual = '0';
  let valorAnterior = '';
  let operacion = null;

  let pantalla = document.getElementById('pantalla');

  function actualizarPantalla() {
    pantalla.textContent = valorActual;
  }

  function agregarNumero(num) {
    if (num === '.' && valorActual.includes('.')) return;
    if (valorActual === '0' && num !== '.') {
      valorActual = num;
    } else {
      valorActual += num;
    }
    actualizarPantalla();
  }

  function seleccionarOperacion(op) {
    if (valorActual === '' && op !== '-') return;
    if (valorAnterior !== '') calcular();
    operacion = op;
    valorAnterior = valorActual;
    valorActual = '';
  }

  function calcular() {
    let resultado;
    let num1 = parseFloat(valorAnterior);
    let num2 = parseFloat(valorActual);

    if (isNaN(num1) || isNaN(num2)) return;

    switch (operacion) {
      case '+': resultado = num1 + num2; break;
      case '-': resultado = num1 - num2; break;
      case '*': resultado = num1 * num2; break;
      case '/': resultado = num2 !== 0 ? num1 / num2 : 'Error'; break;
      default: return;
    }

    valorActual = resultado.toString();
    operacion = null;
    valorAnterior = '';
    actualizarPantalla();
  }

  function limpiar() {
    valorActual = '0';
    valorAnterior = '';
    operacion = null;
    actualizarPantalla();
  }

  function borrar() {
    if (valorActual.length === 1 || valorActual === 'Error') {
      valorActual = '0';
    } else {
      valorActual = valorActual.slice(0, -1);
    }
    actualizarPantalla();
  }

  // --- ASIGNACIÓN DE EVENTOS---- ---
  document.querySelectorAll('.btn-numero').forEach(btn => {
    btn.addEventListener('click', () => agregarNumero(btn.dataset.num));
  });

  document.querySelectorAll('.btn-operacion').forEach(btn => {
    btn.addEventListener('click', () => seleccionarOperacion(btn.dataset.op));
  });

  document.getElementById('btn-igual').addEventListener('click', calcular);
  document.getElementById('btn-limpiar').addEventListener('click', limpiar);
  document.getElementById('btn-borrar').addEventListener('click', borrar);
});