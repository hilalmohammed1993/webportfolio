import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';

// No DB needed for upload, but we check session which now uses JSON DB user
export async function POST(request: Request) {
    // const session = await getSession();
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const destination = formData.get('destination') as string;

    let uploadPath;
    let publicPath;

    if (destination) {
        // Secure destination to only allow specific files
        const allowedDestinations = ['resume.pdf', 'assets/word_cloud.png'];
        if (!allowedDestinations.includes(destination)) {
            return NextResponse.json({ error: 'Invalid destination' }, { status: 400 });
        }
        uploadPath = path.join(process.cwd(), 'public', destination);
        publicPath = destination.startsWith('assets') ? `/${destination}` : `/${destination}`;
    } else {
        const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        uploadPath = path.join(uploadDir, filename);
        publicPath = `/uploads/${filename}`;
    }

    try {
        if (destination) {
            // Ensure directory exists for destination
            await mkdir(path.dirname(uploadPath), { recursive: true });
        }
        await writeFile(uploadPath, buffer);
        return NextResponse.json({ url: publicPath });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
