import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // Get the ID from the URL path
        const url = new URL(request.url);
        const pathParts = url.pathname.split('/');
        const id = pathParts[pathParts.length - 1]; // The last part of the path is the ID

        const levelId = parseInt(id);

        if (isNaN(levelId)) {
            return NextResponse.json(
                { error: 'Invalid level ID' },
                { status: 400 }
            );
        }

        // Fetch the level from the database
        const level = await prisma.level.findUnique({
            where: { id: levelId },
        });

        if (!level) {
            return NextResponse.json(
                { error: 'Level not found' },
                { status: 404 }
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
