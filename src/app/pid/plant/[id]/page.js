import { getComparisons } from '@/lib/drive';
import { requirePidAccess } from '@/lib/requirePidAccess';
import PidAccessDenied from '@/app/pid/components/PidAccessDenied';
import PlantClient from './PlantClient';

export const dynamic = 'force-dynamic';

export default async function PlantPage({ params }) {
    const { id } = await params;
    const { allowed } = await requirePidAccess(`/pid/plant/${id}`);
    if (!allowed) {
        return <PidAccessDenied />;
    }
    let folders = [];
    let error = null;

    try {
        const data = await getComparisons(id);
        folders = data.folders;
    } catch (e) {
        console.error("Failed to fetch plant details", e);
        error = "Could not load plant details.";
    }

    if (error) {
        return (
            <main className="container">
                <div className="card" style={{ borderColor: 'var(--status-critical)' }}>
                    <h3 style={{ color: 'var(--status-critical)' }}>Error</h3>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return <PlantClient folders={folders} />;
}
