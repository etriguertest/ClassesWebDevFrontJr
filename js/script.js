let pantalla = document.getElementById('pantalla');
let contenedor = document.getElementById('contenedor-botones');

let expresion = '';

// Delegación de eventos: escuchamos un solo evento en el contenedor
contenedor.addEventListener('click', function (e) {
  let boton = e.target.closest('button');
  if (!boton) return; // Si no se hizo clic en un botón, no hace nada

  let valor = boton.dataset.val;
  let accion = boton.dataset.action;

  // Botón Limpiar (C)
  if (accion === 'clear') {
    expresion = '';
    pantalla.value = '0';
    return;
  }

  // Botón Borrar (DEL)
  if (accion === 'delete') {
    expresion = expresion.slice(0, -1);
    pantalla.value = expresion || '0';
    return;
  }

  // Botón Igual (=)
  if (accion === 'equal') {
    try {
      if (expresion.trim() !== '') {
        // Evalúa la operación matemática de forma segura
        let resultado = Function('"use strict"; return (' + expresion + ')')();
        
        if (!isFinite(resultado)) {
          pantalla.value = 'Error';
          expresion = '';
        } else {
          pantalla.value = resultado;
          expresion = resultado.toString();
        }
      }
    } catch (error) {
      pantalla.value = 'Error';
      expresion = '';
    }
    return;
  }

  // Entrada de Números u Operadores
  if (valor) {
    if (pantalla.value === '0' && valor !== '.') {
      expresion = valor;
    } else {
      expresion += valor;
    }
    pantalla.value = expresion;
  }
});