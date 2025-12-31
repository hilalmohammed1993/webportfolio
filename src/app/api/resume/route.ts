import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Mock Email Sending
    console.log(`\n--- [MOCK EMAIL SERVICE] ---`);
    console.log(`To: ${email}`);
    console.log(`Subject: Resume Download Request`);
    console.log(`Body: Thank you for your interest. Please find the resume attached.`);
    console.log(`----------------------------\n`);

    return NextResponse.json({ success: true, message: 'Resume sent to email (mock)' });
}
