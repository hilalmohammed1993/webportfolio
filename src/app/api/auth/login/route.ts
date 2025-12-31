import { NextResponse } from 'next/server';
import { db } from '@/lib/json-db';
import bcrypt from 'bcryptjs';
import { loginUser } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const user = db.getUser();

        if (user.username !== username) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Since we don't have a DB with ID, we just simulate ID 1
        await loginUser({ id: 1, username: user.username });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
