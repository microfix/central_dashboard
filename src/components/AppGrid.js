import Link from 'next/link';
import apps from '@/data/apps.json';
import { hasAnyGroup, isAdmin } from '@/lib/groups';

export default function AppGrid({ session }) {
  // Hardcode pid group if no groups in session
  const groups = session?.user?.groups?.length > 0 ? session.user.groups : ['pid'];

  // If user is in admin group, show all
  const isAdminMode = isAdmin(groups);

  const visible = apps.filter((a) => isAdminMode || !a.groups?.length || hasAnyGroup(groups, a.groups));

  return (
    <div>
      <div className="badge">
        <span className="dot" />
        <span>
          Du er logget ind. {isAdminMode ? 'Admin-tilstand: viser alle apps.' : 'Viser kun apps du har adgang til.'}
          <br/>(DEBUG: Grupper: {JSON.stringify(groups)})
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
