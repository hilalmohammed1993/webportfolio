import { NextResponse } from 'next/server';
import { db } from '@/lib/json-db';
import { getSession } from '@/lib/auth';

export async function GET() {
    return NextResponse.json(db.getEducation());
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content_html } = await request.json();
    db.updateEducation({ content_html });

    return NextResponse.json({ success: true });
}
