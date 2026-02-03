import Link from 'next/link';
import apps from '@/data/apps.json';

function hasAnyGroup(userGroups = [], required = []) {
  const set = new Set((userGroups || []).map((g) => String(g).toLowerCase()));
  return required.some((g) => set.has(String(g).toLowerCase()));
}

export default function AppGrid({ session }) {
  const groups = session?.user?.groups || [];

  // If user is in admin group, show all
  const isAdmin = hasAnyGroup(groups, ['admin', 'microfix-admin', 'appfix-admin']);

  const visible = apps.filter((a) => isAdmin || !a.groups?.length || hasAnyGroup(groups, a.groups));

  return (
    <div>
      <div className="badge">
        <span className="dot" />
        <span>
          Du er logget ind. {isAdmin ? 'Admin-tilstand: viser alle apps.' : 'Viser kun apps du har adgang til.'}
        </span>
      </div>

      <div className="grid">
        {visible.map((app) => (
          <div key={app.id} className="card">
            <h3>{app.name}</h3>
            <p>{app.description}</p>
            <div className="small">Adgang: {app.groups?.length ? app.groups.join(', ') : 'Alle brugere'}</div>
            <Link className="link" href={app.url} target="_blank">
              Åbn →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
