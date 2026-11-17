/**
 * ## 🧩 Ejercicio 6: ¿Dónde Está el Campeón?
 */

// Funcion posicionDelMayor(array)

miArreglo = [9, 9, 9];

function posicionDelMayor(array)  {
    let totalMayor = 0; // contador de veces que aparece el mayor
    let mayor = array[0]; // Asignamos el valor en la posicion 0 como el mayor
    let posicionMayor = 0; // 

    for (let i = 0; i < array.length; i++) {
        if(array[i] >= mayor) {
            mayor = array[i];
            posicionMayor = i;
            totalMayor++;
        }
    }
    return posicionMayor;
}

let dondeEstaElMayor = posicionDelMayor(miArreglo);

//console.log( dondeEstaElMayor );

function mostarIndiceMayor() {

    let inputDatos = document.getElementById("inputDatos").value;
    let pResultado = document.getElementById("textoResultado");

    let array = inputDatos.split(", ").map(Number);
    console.log(array);
    
    const indiceMayor = posicionDelMayor(array);

    const mensaje = `la posicion del numero mayor es: ${indiceMayor}`;

    console.log(mensaje);
    
    pResultado.innerText = mensaje;
}

// Funcion del ejercio 7
function simularCajero(pinCorrecto, intentosUsario) {
    let i = 0;

    while(i < 3) {
        if (pinCorrecto === intentosUsario[i]) {
            //console.log("Intento: ", i+1);
            return "Acceso concedido";
        }
        i++;
    }
    console.log("Intento incorrectos: ", i);
    return "Tarjeta bloqueada";
}

function simularCajero2(pinCorrecto, intentosUsario) {
    let i = 0;

    do {
        if (pinCorrecto === intentosUsario[i]) {
            //console.log("Intento: ", i+1);
            return "Acceso concedido";
        }
        i++;
    } while(i < 3);
    console.log("Intento incorrectos: ", i);
    return "Tarjeta bloqueada";
}

const mensaje = simularCajero(1234, [1111, 2222, 0]);
console.log(mensaje);
