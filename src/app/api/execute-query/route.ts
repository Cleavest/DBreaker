import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { query, levelId } = await request.json();

        if (!query) {
            return NextResponse.json(
                { error: 'No SQL query provided' },
                { status: 400 }
            );
        }

        let results;
        let queryError = null;

        try {
            results = await prisma.$queryRawUnsafe(query);
        } catch (error: any) {
            queryError = {
                error: 'SQL execution error',
                message: error.message || 'Error executing SQL query',
            };
        }

        let isCorrect = false;
        let hints = [];

        if (levelId) {
            const level = await prisma.level.findUnique({
                where: { id: parseInt(levelId as string) },
                include: {
                    hints: true,
                },
            });

            if (level) {
                const normalizedQuery = query
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
                const normalizedSolution = level.sqlQuery
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();

                isCorrect = normalizedQuery === normalizedSolution;

                if (!isCorrect && level.hints && level.hints.length > 0) {
                    for (const hint of level.hints) {
                        if (
                            !normalizedQuery.includes(
                                hint.pattern.toLowerCase()
                            )
                        ) {
                            hints.push({
                                pattern: hint.pattern,
                                hint: hint.basicHint,
                            });
                            break;
                        }
                    }
                }
            }
        }

        if (queryError) {
            return NextResponse.json(
                {
                    ...queryError,
                    hints: hints.length > 0 ? hints : undefined,
                },
                { status: 422 }
            );
        }

        return NextResponse.json({
            results: Array.isArray(results) ? results : [results],
            isCorrect,
            hints: !isCorrect && hints.length > 0 ? hints : undefined,
        });
    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json(
            { error: 'Failed to execute query' },
            { status: 500 }
        );
    }
}
