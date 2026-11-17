let nombres = ['Eduardo', 'Jonathan', 'July', 'Jaime', 'Gerbert', 'David'];

//console.log(nombres);
console.log(nombres.length);

for (let i = 0; i < nombres.length; i++ ) {
    //console.log(`${i + 1}. ${nombres[i]}`);
    console.log(nombres[i]);
}

let base = 2;
for (let j = 1; j < 3; j++) {
    base *= 2;
}
console.log(base);

//Ejercicio 4

let palabras1 = ['sol', 'montaña', 'mar', 'computadora', 'pan'];

function buscarPalabraMasLarga(array) {
    let palabraMasLarga = array[0];
    
    for (let i = 0; i < array.length; i++) {
        if (palabraMasLarga.length < array[i].length) { 
            palabraMasLarga = array[i]; 
        }
    }
    return palabraMasLarga;
}

console.log(buscarPalabraMasLarga(palabras1));


let numero = Number(prompt("Ingresa un numero: "));
console.log(`Tu numero es: ${numero}`);
