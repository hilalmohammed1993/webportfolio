import { NextResponse } from 'next/server';
import { db } from '@/lib/json-db';
import { getSession } from '@/lib/auth';

export async function GET() {
    return NextResponse.json(db.getSocials());
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const newItem = db.addSocial(body);

    return NextResponse.json({ success: true, id: newItem.id });
}
