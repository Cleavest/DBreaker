import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.some((publicPath) => path === publicPath);

    // Check if the path is /game or starts with /game/
    const isGamePath = path === '/game' || path.startsWith('/game/');

    // Get the token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // If it's a game path and no token exists, redirect to login
    if (isGamePath && !token) {
        // Redirect to login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Configure the middleware to run only for game pages
export const config = {
    matcher: ['/game', '/game/:path*'],
};
