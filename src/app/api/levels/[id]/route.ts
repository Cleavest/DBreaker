import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const pathParts = url.pathname.split('/');
        const id = pathParts[pathParts.length - 1];

        const levelId = parseInt(id);

        if (isNaN(levelId)) {
            return NextResponse.json(
                { error: 'Invalid level ID' },
                { status: 400 }
            );
        }

        const level = await prisma.level.findUnique({
            where: { id: levelId },
        });

        if (!level) {
            return NextResponse.json(
                { error: 'Level not found' },
                { status: 404 }
            );
        }

        const session = await getServerSession(authOptions);

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? undefined,
            },
        });

        if (user) {
            if (user.currentLevelId != levelId) {
                return NextResponse.json(
                    { error: 'Access Denied' },
                    { status: 500 }
                );
            }
        } else {
            return NextResponse.json(
                { error: 'Failed to fetch User' },
                { status: 500 }
            );
        }

        return NextResponse.json(level);
    } catch (error) {
        console.error('Error fetching level:', error);
        return NextResponse.json(
            { error: 'Failed to fetch level' },
            { status: 500 }
        );
    }
}
