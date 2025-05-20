import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
    try {


        const session = await getServerSession(authOptions);

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? undefined,
            },
        });

        const result = await prisma.user.findUnique({
            where: { id: user?.id },
            select: {
                id: true,
                score: true,
                createdAt: true,
                currentLevelId: true,
                email: true,
                name: true,
                LevelProgress: {
                    orderBy: { level: 'asc' },
                },
            },
        });



        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching Users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Users' },
            { status: 500 }
        );
    }
}
