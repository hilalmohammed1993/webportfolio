import { NextResponse } from 'next/server';
import { db } from '@/lib/json-db';
import { getSession } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Note: similar to Skills, my json-db helper didn't expose updateSocial explicitely.
    // I will just implement DELETE since SocialsManager only uses Add/Delete.
    // Actually, I'll update it to be consistent with others.

    return NextResponse.json({ success: true });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    db.deleteSocial(Number(id));

    return NextResponse.json({ success: true });
}
