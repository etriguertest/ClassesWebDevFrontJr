// Soy un comentario en una linea

/**
 * Soy un comentario de bloque.
 * 2026-10-05
 */

const colorBoton = '#f00';

let soyUnNumero = 0;
// console.log("El numero tiene almacenado: ", soyUnNumero);

soyUnNumero = 2 * 3; // soyUnNumero = 6;
// console.log(`El resultado de 2 * 3 es: ${soyUnNumero}`);
// console.log(`El resultado de 2 * 3 es: ${2 * 3}`);


soyUnNumero *= 3; // soyUnNumero = soyUnNumero * 3;
// console.log(`El resultado * 3 es: ${soyUnNumero}`);

//Declaracion de variables
let modulo = 0;

let resulatdoNum = 0;
let resultadoTexto = "El resultado de la operacione es: "

modulo = 10 % 3; // Esto devuelve el residuo de 10/3 -> (10 - 3*3) = 10 - 9 = 1 -> Residuo es 1
//console.log(`El modulo(residuo o sobrante de la division) 10 % 3 es igual a: ${modulo}`);

// console.log(`Operador para la potenca es **, de forma que 10^3 seria (10 ** 3) es igual a: ${10**3}`);

// Version de calculos y presentacion de resultados de mejor manera: (nombres de variables malos HolaMundo, hola_mundo, hm)
let numeroEntero = 1;
let numeroDecimal = 3.500001;
resulatdoNum = numeroEntero + numeroDecimal;
// console.log(resultadoTexto + resulatdoNum); // 4.500001
// console.log(resultadoTexto + resulatdoNum.toFixed(2)); // 4.50
// console.log(resultadoTexto + Math.ceil(resulatdoNum)); // 5
// console.log(resultadoTexto + Math.floor(resulatdoNum)); // 4
// console.log(resultadoTexto + Math.round(resulatdoNum)); // 5


let soyTexto = "10";
let soyNumero = 5;

let resultado;
resultado = soyTexto + soyNumero; // "105"
//console.log("\n", resultado);

//console.log("\n", soyNumero + soyTexto);

// Arreglos de datos o Arrays

// posicion:       0  1   2   3  4
let integrantes = [3, 4, 11, 20, 7];

// console.log("");

// console.log(integrantes[2]); //el 11

// console.log(integrantes[4]); // el 7

if (integrantes[2] < integrantes[4]) {
    console.log(`El número ${integrantes[2]} es menor que ${integrantes[4]}`);
} else {
    console.log(`El número ${integrantes[2]} es mayor que ${integrantes[4]}`);
}

/**
 * Verifique si el numero que esta en la pocion 0 es mayor o menor que el que 
 * esta en la posicion 1. Punto de mejora consultar si son iguales
 */
// Version 1
// function verificarMayorMenorIgual(num1, num2) {
    
//     if (num1 < num2) {
//         return `El número ${num1} es menor que ${num2}`;
//     } 
//     else if (num1 === num2) {
//         return `El número ${num1} es igual que ${num2}`;
//     }
    
//     return `El número ${num1} es mayor que ${num2}`;
// }


//Version 2
// function verificarMayorMenorIgual(num1, num2) {
    
//     if (num1 < num2) {return `El número ${num1} es menor que ${num2}`;}
//     if (num1 === num2) {return `El número ${num1} es igual que ${num2}`;}
    
//     return `El número ${num1} es mayor que ${num2}`;
// }

//Version 3
function verificarMayorMenorIgual(num1, num2) {
    if (num1 < num2) {
        return `El número ${num1} es menor que ${num2}`;
} else{
    const resultado = num1 === num2 ? `El número ${num1} es igual que ${num2}` : `El número ${num1} es mayor que ${num2}`;
    return resultado;
}
    
}
// console.log(verificarMayorMenorIgual(integrantes[0], integrantes[1]));
let resultadoFuncion = verificarMayorMenorIgual(integrantes[0], integrantes[1]);
console.log(resultadoFuncion); 

let numero3 = prompt("Digita un numero entero: ");

const parImpar = (parseInt(numero3) % 2) == 0 ? "par" : "impar";
console.log(parImpar);
