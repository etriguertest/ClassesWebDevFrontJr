import { useState } from 'react';
import './App.css'

/**
 * Estructura que debe lleva el juego
 * Titulo
 * La opcion que yo voy a mostrar: piedra, papel o tijera
 * mostrar un resultado
 * llevar una tabla de juegos ganados:computadora vs jugador
 * botones con opciones del juego: reiniciar marcador, volver a juagar
 */



function App() {

  // let cafes = 0; // variable normal de JS
  const [cafes, setCafes] = useState(0);

  const tomarCafe = () => {
    setCafes(cafes + 1);
    console.log('La variable cafes vale: ', cafes);
    
  };

  return (
    <>
      <div className="container text-center">
        <h1>{cafes}</h1>
        <button className="btn btn-primary" onClick={tomarCafe}>Tomar cafe</button>
      </div>
    </>
  )
}

export default App
