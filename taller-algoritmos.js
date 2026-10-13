/**
 * TALLER DE ALGORITMOS EN JAVASCRIPT CON MENÚ INTERACTIVO
 * --------------------------------------------------------
 * Archivo: taller-algoritmos.js
 * Ejecutar en consola con: node taller-algoritmos.js
 */

// Importamos el módulo nativo de Node.js para leer entradas desde la consola
let readline = require('readline/promises');
let { stdin: input, stdout: output } = require('process');

// ============================================================================
// FUNCIONES DE LÓGICA
// ============================================================================

/**
 * Desafío 1: Evalúa las reglas del año bisiesto.
 */
function esBisiesto(anio) {
  // Divisible entre 4 y no entre 100, O divisible entre 400
  if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Desafío 2: Encuentra el valor más alto en un arreglo de números.
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

// ============================================================================
// FUNCIONES INTERACTIVAS (ENTRADA DE TECLADO)
// ============================================================================

async function ejecutarDesafio1(rl) {
  console.log("\n--- DESAFÍO 1: AÑO BISIESTO ---");
  let entrada = await rl.question("Ingresa el año que deseas consultar: ");
  let anio = parseInt(entrada);

  // Validación de entrada numérica
  if (isNaN(anio)) {
    console.log("Entrada no válida. Por favor ingresa un número entero.");
    return;
  }

  let bisiesto = esBisiesto(anio);
  if (bisiesto) {
    console.log(`El año ${anio} ES bisiesto.`);
  } else {
    console.log(`El año ${anio} NO es bisiesto.`);
  }
}

async function ejecutarDesafio2(rl) {
  console.log("\n--- DESAFÍO 2: NÚMERO MÁS GRANDE ---");
  console.log("Ingresa 10 números uno a uno:\n");
  let numeros = [];

  // Ciclo para solicitar los 10 números uno por uno
  for (let i = 1; i <= 10; i++) {
    let entrada = await rl.question(`Número ${i} de 10: `);
    let num = parseFloat(entrada);

    // Valida que el dato ingresado sea un número real
    while (isNaN(num)) {
      console.log("Entrada no válida. Debe ser un número.");
      entrada = await rl.question(`Número ${i} de 10: `);
      num = parseFloat(entrada);
    }

    numeros.push(num);
  }

  let mayor = obtenerNumeroMayor(numeros);
  console.log(`\n Lista ingresada: [ ${numeros.join(', ')} ]`);
  console.log(`El número más grande ingresado es: ${mayor}`);
}

async function ejecutarDesafio3(rl) {
  console.log("\n--- DESAFÍO 3: JUEGO ADIVINAR EL NÚMERO ---");
  
  // Genera un número aleatorio entre 1 y 100
  let numeroSecreto = Math.floor(Math.random() * 100) + 1;
  let maxIntentos = 5;
  let adivinado = false;

  console.log("La computadora ha elegido un número secreto entre 1 y 100.");
  console.log(`Tienes ${maxIntentos} intentos para adivinarlo.\n`);

  for (let intento = 1; intento <= maxIntentos; intento++) {
    let entrada = await rl.question(`Intento ${intento}/${maxIntentos} - Ingresa tu número: `);
    let numeroUsuario = parseInt(entrada);

    // Si el dato no es válido, no consumimos el intento
    if (isNaN(numeroUsuario)) {
      console.log("Por favor ingresa un número entero válido.");
      intento--; 
      continue;
    }

    // Evaluación de pistas
    if (numeroUsuario === numeroSecreto) {
      console.log("¡Felicidades! ¡Adivinaste el número secreto!");
      adivinado = true;
      break;
    } else if (numeroUsuario < numeroSecreto) {
      console.log("Pista: El número secreto es MÁS ALTO.\n");
    } else {
      console.log("Pista: El número secreto es MÁS BAJO.\n");
    }
  }

  if (!adivinado) {
    console.log(`Agotaste tus ${maxIntentos} intentos. El número secreto era: ${numeroSecreto}`);
  }
}

// ============================================================================
// MENÚ PRINCIPAL
// ============================================================================

async function iniciarMenu() {
  // Inicializamos la interfaz de lectura
  let rl = readline.createInterface({ input, output });
  let continuar = true;

  while (continuar) {
    console.log("\n========================================");
    console.log("   TALLER DE ALGORITMOS EN JAVASCRIPT   ");
    console.log("========================================");
    console.log("1. Determinar si un año es bisiesto");
    console.log("2. Encontrar el número más grande (10 números)");
    console.log("3. Jugar a adivinar el número");
    console.log("4. Salir");
    console.log("----------------------------------------");

    let opcion = await rl.question("Elige una opción (1-4): ");

    switch (opcion.trim()) {
      case '1':
        await ejecutarDesafio1(rl);
        break;
      case '2':
        await ejecutarDesafio2(rl);
        break;
      case '3':
        await ejecutarDesafio3(rl);
        break;
      case '4':
        console.log("\n¡Hasta luego! Gracias por usar el programa.");
        continuar = false;
        break;
      default:
        console.log("\nOpción no válida. Por favor elige un número del 1 al 4.");
        break;
    }

    if (continuar) {
      await rl.question("\nPresiona ENTER para volver al menú...");
    }
  }

  // Cerramos el flujo de entrada al salir
  rl.close();
}

// Ejecución del programa
iniciarMenu();