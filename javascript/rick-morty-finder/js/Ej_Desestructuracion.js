const personajesDePrueba = [
    {
        id: 1,
        name: 'Rick Sanchez',
        valorX: 100,
        inventos: {
            arma: 'Arma X',
            maquina: 'Cambiar de universos'
        }
    },
    {id: 2, name: 'Morty Smith', valorX: 50}
];


//Sin Desestructuracion
// personajesDePrueba[0].id | personajesDePrueba[0].name 
console.log(
    `id: ${personajesDePrueba[0].id}, nombre: ${personajesDePrueba[0].name}, maquina: ${personajesDePrueba[0].inventos.maquina}`);

//Con Desestructuracion
const {id, name: nombre, inventos: {maquina}} = personajesDePrueba[0]; 
console.log(`id: ${id}, nombre: ${nombre}, maquina: ${maquina}`);
