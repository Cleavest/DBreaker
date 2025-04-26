import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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

        return NextResponse.json(levelsWithDifficulty);
    } catch (error) {
        console.error('Error fetching levels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch levels' },
            { status: 500 }
        );
    }
}
