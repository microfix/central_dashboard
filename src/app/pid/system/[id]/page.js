import { getComparisons } from '@/lib/drive';
import { requirePidAccess } from '@/lib/requirePidAccess';
import PidAccessDenied from '@/app/pid/components/PidAccessDenied';
import SystemClient from './SystemClient';

export const dynamic = 'force-dynamic';

export default async function SystemPage({ params }) {
    const { id } = await params;
    const { allowed } = await requirePidAccess(`/pid/system/${id}`);
    if (!allowed) {
        return <PidAccessDenied />;
    }
    let comparisons = [];
    let error = null;

    try {
        const data = await getComparisons(id);
        comparisons = data.comparisons;
    } catch (e) {
        console.error("Failed to fetch system details", e);
        error = "Could not load comparisons.";
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

    return <SystemClient comparisons={comparisons} />;
}
