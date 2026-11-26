import CantoDuelo from './CantoDuelo.jsx';
import florkFeliz from '../assets/flork-feliz.png';
import florkMolesto from '../assets/flork-molesto.png';
import florkRetador from '../assets/flork-retador.png';

const REACCIONES_FLORK = {
  ganaste: {
    imagen: florkFeliz,
    texto: '🎉 ¡Ganaste esta ronda!',
    claseAlerta: 'alert-success',
  },
  perdiste: {
    imagen: florkMolesto,
    texto: '😤 ¡Perdiste! La computadora te ganó',
    claseAlerta: 'alert-danger',
  },
  empate: {
    imagen: florkRetador,
    texto: '🤨 ¡Empate! Va de nuevo',
    claseAlerta: 'alert-warning',
  },
};

export default function ArenaDuelo({
  nombreJugador,
  jugadaJugador,
  jugadaCPU,
  resultado,
  pensando,
}) {
  const etiquetaJugador = nombreJugador.trim() || 'Jugador';
  const reaccion = resultado ? REACCIONES_FLORK[resultado] : null;

  return (
    <div
      className="bg-body-tertiary rounded-4 p-3 d-flex flex-column justify-content-center text-center border"
      style={{ minHeight: 335 }}
    >
      {/* ESTADO 1: Esperando primera jugada */}
      {!pensando && !reaccion && (
        <div>
          <img
            src={florkRetador}
            alt="Listo para jugar"
            className="rounded-3 mb-2"
            style={{ width: 115, height: 115, objectFit: 'contain' }}
          />
          <h3 className="h6 fw-bold mb-1">¡Listos para el duelo, {etiquetaJugador}!</h3>
          <p className="small text-muted mb-0">
            Selecciona Piedra, Papel o Tijera a la izquierda para comenzar.
          </p>
        </div>
      )}

      {/* ESTADO 2: Canto rítmico */}
      {pensando && <CantoDuelo nombreJugador={nombreJugador} />}

      {/* ESTADO 3: Revelación de jugadas y resultado */}
      {!pensando && reaccion && jugadaJugador && jugadaCPU && (
        <div>
          <div className="row align-items-center mb-2">
            <div className="col-5">
              <p className="small text-muted fw-bold mb-1">{etiquetaJugador}</p>
              <div style={{ fontSize: '3.6rem', lineHeight: 1.1 }}>
                {jugadaJugador.emoji}
              </div>
              <p className="small fw-semibold mt-1 mb-0">{jugadaJugador.nombre}</p>
            </div>
            <div className="col-2">
              <span className="badge text-bg-dark fs-6">VS</span>
            </div>
            <div className="col-5">
              <p className="small text-muted fw-bold mb-1">Computadora</p>
              <div style={{ fontSize: '3.6rem', lineHeight: 1.1 }}>
                {jugadaCPU.emoji}
              </div>
              <p className="small fw-semibold mt-1 mb-0">{jugadaCPU.nombre}</p>
            </div>
          </div>

          <div className={`alert ${reaccion.claseAlerta} py-2 px-3 mb-0 rounded-3`}>
            <img
              src={reaccion.imagen}
              alt={reaccion.texto}
              className="rounded-3 mb-1"
              style={{ width: 88, height: 88, objectFit: 'contain' }}
            />
            <p className="fw-bold mb-0">{reaccion.texto}</p>
          </div>
        </div>
      )}
    </div>
  );
}