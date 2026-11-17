//console.log('GhostNet v2 inicializada');

/* Pruebas teoria de la guia
const agentesBase = ['ALPHA', 'BRAVO'];
//agentesBase.push("gamma"); NO usar mala practica, tampoco .pop() ni .splice()



// Métodos con inmutabilidad
// El deber ser: Spread(...)
const agentesNuevo = [...agentesBase, 'GAMMA'];

console.log(agentesBase);
console.log(agentesNuevo);

//Veamos como trabaja .slice()
// Un parametro
console.log( agentesNuevo.slice(0) ); // ALPHA, BRAVO, GAMMA
console.log( agentesNuevo.slice(1) ); // BRAVO, GAMMA

//2 parametros: el ultimo no se copia
console.log( agentesNuevo.slice(0, 1) ); // ALPHA
console.log( agentesNuevo.slice(0, -2) ); // ALPHA

console.log(agentesNuevo);

// Saber si mi arreglo tiene un valor determinado
console.log( agentesNuevo.includes('EDUARDO') ); //false
console.log( agentesNuevo.includes('bravo'.toUpperCase()) ); //true
*/

// app.js — Demostración de mutación por referencia
const archivoOriginal = ['SHADOW', 'VIPER', 'PHANTOM'];

console.log('1. Original antes:', archivoOriginal.join(', '));

// El falso clon: asignamos por referencia
const copiaSospechosa = archivoOriginal;

// Agregamos un agente renegado a la supuesta "copia"
copiaSospechosa.push('TRAIDOR');

console.log('2. Copia después de push:', copiaSospechosa.join(', '));
console.log('3. Original después de push:', archivoOriginal.join(', '));
console.log('4. ¿Son el mismo arreglo?', copiaSospechosa === archivoOriginal);

// pop() también muta: expulsamos a alguien de la "copia"...
const expulsado = copiaSospechosa.pop();

console.log('5. pop() sacó a:', expulsado);
console.log('6. Original después de pop:', archivoOriginal.join(', '));

//--------------------------------------------------------------------------

const escuadronAlfa = ['ECHO', 'FOX', 'GHOST'];

// 1. Clonación real e independiente:
const escuadronCopia = [...escuadronAlfa];

// 5. Verificación de identidad en memoria:
console.log('¿Alfa y Copia son el mismo objeto en memoria?:',
  escuadronAlfa === escuadronCopia);