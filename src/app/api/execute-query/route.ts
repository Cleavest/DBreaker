import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Parser } from 'node-sql-parser';
 import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();
const parser = new Parser();
 
// Allowed tables for SELECT operations
const ALLOWED_TABLES = ['course', 'grade', 'student'];
 
interface SelectAST {
    type: 'select';
    from: Array<{ table: string }> | { table: string };
}
 
function validateSelectQuery(query: string): {
    isValid: boolean;
    error?: string;
} {
    try {
        // Parse the SQL query
        const ast = parser.astify(query) as SelectAST;
 
        // Check if it's a SELECT query
        if (ast.type !== 'select') {
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
 
        const upperQuery = query.toUpperCase();
        for (const pattern of dangerousPatterns) {
            if (upperQuery.includes(pattern)) {
                return {
                    isValid: false,
                    error: 'Query contains potentially dangerous patterns',
                };
            }
        }
 
        // Check tables in FROM clause
        if (ast.from) {
            const tables = Array.isArray(ast.from) ? ast.from : [ast.from];
            for (const table of tables) {
                const tableName = table.table.toLowerCase();
                if (!ALLOWED_TABLES.includes(tableName)) {
                    return {
                        isValid: false,
                        error: `Table '${tableName}' is not allowed for SELECT operations`,
                    };
                }
            }
        }
 
        return { isValid: true };
    } catch (error: any) {
        return {
            isValid: false,
            error: `SQL Syntax Error: ${error.message}`,
        };
    }
}
 
export async function POST(request: NextRequest) {
    try {
        const { query, levelId, hintsCounter } = await request.json();
 
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
            // Use $queryRawUnsafe since we've already validated the query
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
 
                // Execute both queries and compare results
                const userResults = await prisma.$queryRawUnsafe(query);
                const solutionResults = await prisma.$queryRawUnsafe(
                    level.sqlQuery
                );
 
                // Compare results by converting to JSON strings
                isCorrect =
                    JSON.stringify(userResults) ===
                    JSON.stringify(solutionResults);
 
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

        if (isCorrect) {
            const session = await getServerSession(authOptions);

            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email ?? undefined,
                },
            });

            if (user && user.currentLevelId == levelId) {
                const score = hintsCounter > 2 ? 1 : 3 - hintsCounter;
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        currentLevelId: {
                            increment: 1,
                        },
                        score: {
                            increment: score,
                        }
                    },
                });
            }
        }
 
        return NextResponse.json({
            results: Array.isArray(results) ? results : [results],
            isCorrect,
            hints: !isCorrect && hints.length > 0 ? hints : undefined,
        });
    } catch (error: any) {
        console.error('Error executing query:', error);
 
        // Check for specific database errors
        if (error.code === 'P2002') {
            return NextResponse.json(
                {
                    error: 'Unique constraint violation',
                    message: 'This record already exists',
                },
                { status: 400 }
            );
        }
 
        if (error.code === 'P2025') {
            return NextResponse.json(
                {
                    error: 'Record not found',
                    message: 'The requested record does not exist',
                },
                { status: 404 }
            );
        }
 
        // Check for SQL syntax errors
        if (error.message && error.message.includes('syntax error')) {
            return NextResponse.json(
                { error: 'SQL Syntax Error', message: error.message },
                { status: 400 }
            );
        }
 
        // Check for table/column not found errors
        if (
            error.message &&
            (error.message.includes('relation') ||
                error.message.includes('column') ||
                error.message.includes('does not exist'))
        ) {
            return NextResponse.json(
                { error: 'Database Object Error', message: error.message },
                { status: 400 }
            );
        }
 
        return NextResponse.json(
            {
                error: 'Database Error',
                message: error.message || 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}