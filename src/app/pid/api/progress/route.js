import { NextResponse } from 'next/server';
import { progressStore } from '@/lib/progress';
import { requirePidRouteAccess } from '@/lib/requirePidRouteAccess';

export async function POST(request) {
    const auth = await requirePidRouteAccess();
    if (!auth.ok) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: auth.status });
    }

    try {
        const body = await request.json();
        const { id, progress } = body;

        if (id) {
            progressStore.set(id, progress);
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(request) {
    const auth = await requirePidRouteAccess();
    if (!auth.ok) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const progress = progressStore.get(id) || 0;

    return NextResponse.json({ progress });
}
