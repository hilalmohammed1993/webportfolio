import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { db } from '@/lib/json-db';
import { getSession } from '@/lib/auth';

export async function GET() {
    return NextResponse.json(db.getSkills());
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    if (Array.isArray(body)) {
        db.setSkills(body);
        return NextResponse.json({ success: true });
    }

    const newItem = db.addSkill(body);
    return NextResponse.json({ success: true, id: newItem.id });
}
