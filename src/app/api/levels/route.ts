import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const levels = await prisma.level.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
        });

        const levelsWithDifficulty = levels.map((level) => ({
            ...level,
            difficulty:
                level.id <= 2 ? 'Easy' : level.id <= 4 ? 'Medium' : 'Hard',
        }));

        const session = await getServerSession(authOptions);

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? undefined,
            },
        });

        let result = {
            levels: levelsWithDifficulty,
            level: user?.currentLevelId
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching levels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch levels' },
            { status: 500 }
        );
    }
}
