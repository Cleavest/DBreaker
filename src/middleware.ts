import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.some((publicPath) => path === publicPath);

    const isGamePath = path === '/game' || path.startsWith('/game/');

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (isGamePath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/game', '/game/:path*'],
};
