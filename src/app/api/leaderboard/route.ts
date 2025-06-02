import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const leaderboard = await prisma.user.findMany({
            where: {
                score: {
                    gt: 0,
                },
            },
            orderBy: {
                score: 'desc',
            },
            take: 10,
            select: {
                name: true,
                score: true,
                id: true
            },
        });

        const session = await getServerSession(authOptions);

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? undefined,
            },
        });

        let result = {
            leaderboard : leaderboard,
            user: user?.id
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching Users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Users' },
            { status: 500 }
        );
    }
}
