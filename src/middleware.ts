import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const isLoginPage = request.nextUrl.pathname === '/admin/login';

    if (!token && !isLoginPage && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
