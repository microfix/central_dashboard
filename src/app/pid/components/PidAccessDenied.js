import Link from 'next/link';

export default function PidAccessDenied() {
  return (
    <main className="container">
      <div className="card" style={{ borderColor: 'var(--status-critical)' }}>
        <h3>Ingen adgang</h3>
        <p>Du har ikke adgang til PID Compare. Kontakt en admin for at få gruppen &quot;pid&quot;.</p>
        <Link href="/" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Tilbage til dashboard
        </Link>
      </div>
    </main>
  );
}
