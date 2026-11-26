import { useState, useEffect } from 'react';

const PASOS_CANTO = [
  { texto: '¡Pieeedra...', color: 'text-primary' },
  { texto: '...papeeel...', color: 'text-warning-emphasis' },
  { texto: '...o tijeraaaa...', color: 'text-danger' },
  { texto: '💥 ¡YAAA!', color: 'text-success' },
];

export default function CantoDuelo({ nombreJugador }) {
  const [paso, setPaso] = useState(0);
  const alias = nombreJugador.trim() || 'Jugador';

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPaso((prev) => (prev < PASOS_CANTO.length - 1 ? prev + 1 : prev));
    }, 350);

    return () => clearInterval(intervalo);
  }, []);

  const actual = PASOS_CANTO[paso];

  return (
    <div className="py-2">
      <div className="row align-items-center mb-3">
        <div className="col-5">
          <p className="small text-muted fw-bold mb-1">{alias}</p>
          <div className="mano-cantando" style={{ fontSize: '4.2rem', lineHeight: 1.1 }}>
            🤜🏼
          </div>
        </div>
        <div className="col-2">
          <span className="badge text-bg-dark fs-6">VS</span>
        </div>
        <div className="col-5">
          <p className="small text-muted fw-bold mb-1">Computadora</p>
          <div
            className="mano-cantando"
            style={{ fontSize: '4.2rem', lineHeight: 1.1, animationDelay: '0.08s' }}
          >
            🤛🏼
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-pill py-2 px-4 d-inline-block shadow-sm">
        <span className={`fs-5 fw-bold ${actual.color}`}>{actual.texto}</span>
      </div>
    </div>
  );
}