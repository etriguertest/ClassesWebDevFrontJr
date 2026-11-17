/**
 * Como saber si un año es bisiesto:
 * - debe compir con 3 condiciones:
 *  1. Ser divisible por 4
 *  2. No debe ser divisible por 100
 *  3. Ser divisible por 400
 * 
 */

function esBisiesto (anio) {
    if (anio % 4 === 0 && anio % 100 !== 0 || anio % 400 === 0) {
        return true;
    }
    return false;
}

// Captura, calculos y presentación de resultado
function bisiesto() {
    let anio = Number(document.getElementById('valor').value); //captura el valor del imput
    let resultado = document.getElementById('resultado'); // asignamos a resultado = <p id="resultado"></p>
    //console.log(anio);

    if (esBisiesto(anio)) {
        //console.log("es bisiesto");
        resultado.textContent = "es bisiesto";
    } else {
        //console.log("no es bisiesto");
        resultado.textContent = "no es bisiesto";
    }

}
