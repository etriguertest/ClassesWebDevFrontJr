export default function TablaMarcador({ nombreJugador, marcador }) {
  const etiquetaJugador = nombreJugador.trim() || 'Jugador';

  return (
    <div className="table-responsive mb-4">
      <table className="table table-bordered align-middle text-center mb-0 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th style={{ width: '38%' }}>{etiquetaJugador}</th>
            <th style={{ width: '24%' }}>Empates</th>
            <th style={{ width: '38%' }}>Computadora</th>
          </tr>
        </thead>
        <tbody>
          <tr className="fs-3 fw-bold">
            <td className="text-primary">{marcador.jugador}</td>
            <td className="text-secondary">{marcador.empates}</td>
            <td className="text-danger">{marcador.cpu}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}