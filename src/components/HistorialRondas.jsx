export default function HistorialRondas({
  historial,
  nombreJugador,
  onVolverJugar,
  onLimpiarHistorial,
}) {
  const alias = nombreJugador.trim() || 'Jugador';

  const etiquetaDesenlace = (desenlace) => {
    if (desenlace === 'ganaste') {
      return { texto: `Ganó ${alias}`, clase: 'bg-success' };
    }
    if (desenlace === 'perdiste') {
      return { texto: 'Ganó CPU', clase: 'bg-danger' };
    }
    return { texto: 'Empate', clase: 'bg-warning text-dark' };
  };

  return (
    <div className="card tarjeta-tablero rounded-4 p-3 p-md-4 bg-white">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h4 fw-bold mb-0">📜 Historial de rondas</h2>
          <p className="text-muted small mb-0">
            Total de rondas registradas: {historial.length}
          </p>
        </div>

        <div className="d-flex gap-2">
          {historial.length > 0 && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={onLimpiarHistorial}
            >
              Limpiar historial
            </button>
          )}
          <button
            type="button"
            className="btn btn-dark btn-sm fw-semibold"
            onClick={onVolverJugar}
          >
            🎮 Volver a jugar
          </button>
        </div>
      </div>

      {historial.length === 0 ? (
        <div className="text-center py-5 bg-body-tertiary rounded-3 border">
          <p className="text-muted mb-3">Todavía no se ha jugado ninguna ronda.</p>
          <button
            type="button"
            className="btn btn-primary btn-sm fw-semibold"
            onClick={onVolverJugar}
          >
            Ir a la arena
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Hora</th>
                <th>{alias}</th>
                <th>CPU</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((ronda) => {
                const badge = etiquetaDesenlace(ronda.desenlace);
                return (
                  <tr key={ronda.id}>
                    <td className="text-muted small">{ronda.hora}</td>
                    <td className="fw-semibold">{ronda.jugador}</td>
                    <td className="fw-semibold">{ronda.cpu}</td>
                    <td>
                      <span className={`badge ${badge.clase}`}>{badge.texto}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}