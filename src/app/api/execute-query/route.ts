import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Allowed tables for SELECT operations
const ALLOWED_TABLES = ['course', 'grade', 'student'];

function validateSelectQuery(query: string): {
    isValid: boolean;
    error?: string;
} {
    // Convert to uppercase for case-insensitive comparison
    const upperQuery = query.toUpperCase().trim();

    // Check if query starts with SELECT
    if (!upperQuery.startsWith('SELECT')) {
        return { isValid: false, error: 'Only SELECT queries are allowed' };
    }

    // Check for dangerous patterns
    const dangerousPatterns = [
        'DROP',
        'TRUNCATE',
        'ALTER',
        'CREATE',
        'EXEC',
        'UNION',
        '--',
        ';',
        '/*',
        'INSERT',
        'UPDATE',
        'DELETE',
    ];

    for (const pattern of dangerousPatterns) {
        if (upperQuery.includes(pattern)) {
            return {
                isValid: false,
                error: 'Query contains potentially dangerous patterns',
            };
        }
    }

    // Extract table name from SELECT query
    const tableMatch = upperQuery.match(/FROM\s+(\w+)/);
    if (!tableMatch) {
        return { isValid: false, error: 'Invalid SELECT query format' };
    }

    const tableName = tableMatch[1].toLowerCase();
    if (!ALLOWED_TABLES.includes(tableName)) {
        return {
            isValid: false,
            error: 'Table not allowed for SELECT operations',
        };
    }

    return { isValid: true };
}

export async function POST(request: NextRequest) {
    try {
        const { query, levelId } = await request.json();

        if (!query) {
            return NextResponse.json(
                { error: 'No SQL query provided' },
                { status: 400 }
            );
        }

        // Validate that only SELECT queries are allowed
        const validation = validateSelectQuery(query);
        if (!validation.isValid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        let results;
        let queryError = null;

        try {
            // Use parameterized query
            results = await prisma.$queryRaw`${query}`;
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
