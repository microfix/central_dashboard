'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <main className="container">
      <div className="card" style={{ borderColor: 'rgba(255,80,80,0.35)' }}>
        <h3>Fejl i dashboard</h3>
        <p className="small">Der opstod en client-side fejl. Prøv at genindlæse siden.</p>
        <div className="hr" />
        <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--muted)', fontSize: 12 }}>
{String(error?.message || error)}
        </pre>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => reset()}>
            Prøv igen
          </button>
          <button className="btn" onClick={() => location.reload()}>
            Genindlæs
          </button>
        </div>
      </div>
    </main>
  );
}
