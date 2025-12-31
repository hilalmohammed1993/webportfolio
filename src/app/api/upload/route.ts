import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';

// No DB needed for upload, but we check session which now uses JSON DB user
export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    try {
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
