import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
export function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const user = cookieStore.get('accessToken');
    const pathname = request.nextUrl.pathname;
    if (
        !user &&
        !pathname.startsWith('/login') &&
        !pathname.startsWith('/signup') &&
        !pathname.startsWith('/user')
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (
        user &&
        (pathname.startsWith('/login') || pathname.startsWith('/signup'))
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
