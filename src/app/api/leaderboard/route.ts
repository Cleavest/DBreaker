import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const result = await prisma.user.findMany({
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


        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching Users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Users' },
            { status: 500 }
        );
    }
}
