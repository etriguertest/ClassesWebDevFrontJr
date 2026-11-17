import './App.css'
import Saludo from './components/Saludo'

function App() {

  const nombre = 'WDFRT1'

  return (
    <div className="container">
      <div className="row align-items-center justifi-content-center vh-100">
        <div className="col text-center">

          <Saludo name={nombre} symbol="!"/>

          <h1>Bienvenidos a la clase 2 de React + Vite</h1>
          <p className="texto-rojo">Con la laterminal CMD configurada en Windows ya me dejo de dar errores nmp</p>
          <button type="button" className="btn btn-success">Success</button>
          <button type="button" className="btn btn-danger">Danger</button>
          <button type="button" className="btn btn-warning">Warning</button>
        </div>
      </div>
    </div>
  )
}

export default App
