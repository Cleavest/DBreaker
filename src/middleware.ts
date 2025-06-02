import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from './lib/prisma';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;



    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.some((publicPath) => path === publicPath);

    const isGamePath = path === '/game' || path.startsWith('/game/');

    const regex = /^\/game\/(0|[1-9]\d*)$/;

    const isPlayGame = regex.test(path);

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    token?.name

    if (isGamePath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/game', '/game/:path*'],
};
