//let titulo = document.getElementById("titulo"); // o el de abajo es equiv.
let titulo = document.querySelector('#titulo');
//console.log(titulo);

let esLunes = true;

if (esLunes) {
    titulo.style.color = 'green';
}

function cambiarColor() {
    titulo.style.color = 'blue';
}

let tarjetas = document.querySelectorAll('.tarjeta');
//console.log(tarjetas);

// en mi CSS: background-color: beige;
//Modificción en bloque
//tarjetas.forEach( (tarjeta, indice) => {
tarjetas.forEach( (tarjeta) => {
    tarjeta.style.backgroundColor = "lightblue";
    tarjeta.style.color = "gray";
    //console.log(tarjeta); //console.log(tarjeta, indice);
    //tarjeta.style.border = "2px solid blue";
});

// Modificacion manual por su id(solo eran dos entoces: 0 ó 1)
// en mi CSS: background-color: aquamarine;
tarjetas[0].style.backgroundColor = 'aquamarine';
tarjetas[0].style.padding = '2rem';

titulo.innerHTML = /*html*/ `Hola <i>WD</i> Frontend!`;


//Prueba de eventos
const boton = document.querySelector('#btn-cambiar-color');
//console.log(boton);

boton.addEventListener('click', (event) => {
    console.log('Tipo de evento:', event.type);        // "click"
    console.log('Elemento clickeado:', event.target);  // el botón
    console.log('Texto del botón:', event.target.textContent);
    console.log('Posición X del clic:', event.clientX);
    console.log('Posición Y del clic:', event.clientY);
});


// Agregar elemento a un hijo o dentro de nuestro etiqueta de HTML
// ... que seleccionamos

//1. Crear el elmento que queremos insertar
const nuevaHabilidad = document.createElement('li');
nuevaHabilidad.textContent = 'Bootsrap 5.3.8';

//2. Insertar en el DOM
const listaHabilidades = document.querySelector('#lista-habilidades');
//listaHabilidades.appendChild(nuevaHabilidad);           // al final
listaHabilidades.prepend(nuevaHabilidad);               // al inicio
//listaHabilidades.insertBefore(nuevaHabilidad, referencia); // antes de otro

//let habilidades = ["HTML", "CSS", "Bootstrap 5.3.8"];