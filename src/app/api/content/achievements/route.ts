import { NextResponse } from 'next/server';
import { db } from '@/lib/json-db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json(db.getAchievements());
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const item = await request.json();
    const newItem = db.addAchievement(item);

    return NextResponse.json(newItem);
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const items = await request.json();
    db.setAchievements(items);

    return NextResponse.json({ success: true });
}
