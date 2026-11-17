import './App.css'
import Ficha from './components/Ficha'
import Saludo from './components/Saludo'

function App() {

  const nombre = 'WDFRT1'

  return (
    <div className="container">
      <div className="row align-items-center justifi-content-center vh-100">
        <div className="col text-center">

          <Saludo name={nombre} symbol="!" />
          <Saludo name="Eduardo" symbol=", hoy es viernes!" />

          <h1>Bienvenidos a la clase 2 de React + Vite</h1>
          <p className="texto-rojo">Con la laterminal CMD configurada en Windows ya me dejo de dar errores nmp</p>
          <button type="button" className="btn btn-success">Success</button>
          <button type="button" className="btn btn-danger">Danger</button>
          <button type="button" className="btn btn-warning">Warning</button>
          
          <br />
          <Ficha nombre="Pepito" edad={28} />
        </div>
      </div>
    </div>
  )
}

export default App
