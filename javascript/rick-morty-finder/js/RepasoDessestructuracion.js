// //console.log('Api Rick & Morty en espera ...');
// import { PI, sumar } from './matematicas.js';

// console.log(PI);
// console.log(sumar(1, 2));

const personaje = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  origin: { name: 'Earth (C-137)' }
};

// 0. Sin desestructuración: repetimos "personaje." cada vez
const nombreViejo = personaje.name;
const estadoViejo = personaje.status;
console.log('0.', nombreViejo, estadoViejo);

// 1-2. Con desestructuración: varias propiedades en una sola línea
const { name: nombre, status: estado } = personaje;
console.log('1-2.', nombre, estado);

// 3. Objeto anidado: entramos a origin y sacamos su name con alias
const { origin: { name: planeta } } = personaje;
console.log('3.', planeta);

// 4. Valor por defecto: solo se usa si la propiedad NO existe
const { species = 'proximamente', birthday = 'No lo tiene el objeto' } = personaje;
console.log('4.', species);

// 5. Arreglos: importa la POSICIÓN, no el nombre
const equipo = ['Rick', 'Morty', 'Summer', 'Jerry'];
const [lider, segundo] = equipo;
const [primero, ...resto] = equipo;
console.log('5.', lider, segundo);
console.log('6.', primero, resto.length);

// 6. En los parámetros de una función
const presentar = ({ name, status }) => `${name} está ${status}`;
console.log('7.', presentar(personaje));

// 7. Spread en objetos: copia + cambio, sin tocar el original
const conFavorito = { ...personaje, favorito: true };
const rickMuerto = { ...personaje, status: 'Dead' };
console.log('8.', conFavorito.favorito);
console.log('9.', personaje.status, rickMuerto.status);

// 8. El orden importa: lo que va DESPUÉS sobrescribe
const sobrescrito = { status: 'Dead', ...personaje };
//orden correcto:
// const sobrescrito = { ...personaje, status: 'Dead' };

console.log('10.', sobrescrito.status);

// 9. Es una copia superficial: lo anidado se comparte
console.log('11.', conFavorito === personaje);
console.log('12.', conFavorito.origin === personaje.origin);

// 10. Spread en arreglos
const equipoNuevo = [...equipo, 'Beth'];
console.log('13.', equipo.length, equipoNuevo.length, equipoNuevo[4]);