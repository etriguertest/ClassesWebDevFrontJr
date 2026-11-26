import florkFeliz from '../assets/flork-feliz.png';
import florkMolesto from '../assets/flork-molesto.png';

export default function ModalCampeon({ ganador, nombreJugador, marcador, onNuevaPartida }) {
  if (!ganador) return null;

  const alias = nombreJugador.trim() || 'Jugador';
  const ganoJugador = ganador === 'jugador';

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content tarjeta-tablero rounded-4 border-0 text-center p-3">
          <div className="modal-header border-0 pb-0 justify-content-center">
            <h2 className="modal-title h4 fw-bold mb-0">
              {ganoJugador ? '🏆 ¡Nuevo Campeón!' : '🤖 ¡La CPU ganó la serie!'}
            </h2>
          </div>

          <div className="modal-body">
            <img
              src={ganoJugador ? florkFeliz : florkMolesto}
              alt={ganoJugador ? 'Victoria' : 'Derrota'}
              className="rounded-3 mb-3"
              style={{ width: 120, height: 120, objectFit: 'contain' }}
            />
            <p className="mb-2">
              {ganoJugador
                ? `¡Felicidades, ${alias}! Alcanzaste primero los 3 puntos.`
                : `La computadora llegó primero a 3 puntos esta vez, ${alias}.`}
            </p>
            <p className="fw-bold fs-5 mb-0">
              {alias} {marcador.jugador} - {marcador.cpu} CPU
            </p>
          </div>

          <div className="modal-footer border-0 pt-0 justify-content-center">
            <button
              type="button"
              className="btn btn-primary fw-semibold px-4"
              onClick={onNuevaPartida}
            >
              🔄 Jugar nueva serie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}