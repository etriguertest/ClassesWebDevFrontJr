import { personajesPrueba } from "./datos.js";
import CONFIG from "./config.js";

// console.log('Personajes importados:', personajesPrueba.length);
// console.log('URL de la API:', CONFIG.urlApi);

// foreEach: mostrar id y nombre de cada personaje
personajesPrueba.forEach( (personaje) => {
    console.log(`#${personaje.id} ${personaje.name}`);
});

// map: transforma CADA elemento → arreglo nuevo del mismo largo
const nombres = personajesPrueba.map((personaje) => personaje.name);
console.log('map:', nombres);

// Copia con filter
// filter: se queda con los que cumplen la condición
const origen = personajesPrueba.filter((personaje) => personaje.origin.name === 'Earth (C-137)');
console.log('filter (Earth (C-137)):', origen.length);

// find: devuelve el PRIMERO que cumple (o undefined si ninguno)
const abradolf = personajesPrueba.find((personaje) => personaje.id === 7);
const nadie = personajesPrueba.find((personaje) => personaje.id === 100);
console.log('find:', abradolf.name, '|', nadie);

// some: ¿al menos uno cumple? → true / false
const hayMuertos = personajesPrueba.some((personaje) => personaje.status === 'Dead');
const hayVivos = personajesPrueba.some((personaje) => personaje.status === 'Alive');
console.log('some:', hayMuertos);

// Encadenamiento: filter y luego map ( si hay datos que cumplen la condición )
if(hayVivos) {
    const nombresVivos = personajesPrueba
        .filter((personaje) => personaje.status === 'Alive')
        .map((personaje) => personaje.name);
    console.log('encadenado:', nombresVivos);
}

const items = personajesPrueba.map((personaje) => `<li>${personaje.name}</li>`);

console.log(String(items));   // un arreglo convertido a texto: ¡trae comas!
console.log(items.join(''));  // unido sin separador: HTML limpio

const marcarVisto = (lista, id) => {
    return lista.map( (personaje) => {
        if (personaje.id === id) {
            return {...personaje, visto: true}
        }
        return personaje;
    });
};

const conVisto = marcarVisto(personajesPrueba, 7);

console.log('original:', personajesPrueba[2].visto);   // undefined
console.log('nuevo:', conVisto[2].visto);              // true
console.log('¿misma lista?', conVisto === personajesPrueba);   // false