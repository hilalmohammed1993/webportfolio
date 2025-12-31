import { NextResponse } from 'next/server';
import { db } from '@/lib/json-db';
import { getSession } from '@/lib/auth';

export async function GET() {
    return NextResponse.json(db.getProfile());
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { summary, resume_path } = body;

    const updated = db.updateProfile({ summary, resume_path });

    return NextResponse.json({ success: true, data: updated });
}
