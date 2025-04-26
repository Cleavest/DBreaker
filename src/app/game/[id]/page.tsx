'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
});

// Interface for the level data
interface LevelData {
    id: number;
    name: string;
    description: string;
    sqlQuery: string;
}

export default function GameLevelPage() {
    const params = useParams();
    const router = useRouter();
    const levelId = params.id as string;

    const [level, setLevel] = useState<LevelData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');
    const [queryResults, setQueryResults] = useState<any[]>([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [textPages, setTextPages] = useState<string[]>([]);
    const [hints, setHints] = useState<
        Array<{ pattern: string; hint: string }>
    >([]);

    // Fetch level data when component mounts or levelId changes
    useEffect(() => {
        const fetchLevel = async () => {
            if (!levelId) return;

            setLoading(true);
            try {
                // Fetch level data from API
                const response = await fetch(`/api/levels/${levelId}`);

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch level: ${response.status}`
                    );
                }

                const data = await response.json();
                setLevel(data);
                setTextPages(data.description.split('|||'));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching level:', error);
                setError('Failed to load level data');
                setLoading(false);
            }
        };

        fetchLevel();
    }, [levelId]);

    const goToPrevious = () => {
        setCurrentTextIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const goToNext = () => {
        setCurrentTextIndex((prev) =>
            prev < textPages.length - 1 ? prev + 1 : prev
        );
    };

    // Function to check if the user's query matches the expected solution
    const checkSolution = async () => {
        if (!level) return;

        // Clear previous results and hints
        setQueryResults([]);
        setHints([]);

        try {
            // Execute the query through our API
            const response = await fetch('/api/execute-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: sqlQuery,
                    levelId: level.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error executing query:', errorData);

                // Display hints if available
                if (errorData.hints && errorData.hints.length > 0) {
                    setHints(errorData.hints);
                }

                setQueryResults([
                    { error: errorData.message || 'Error executing query' },
                ]);
                return;
            }

            const data = await response.json();

            // Set the results
            setQueryResults(data.results || []);

            // Show hints if query is not correct
            if (!data.isCorrect && data.hints && data.hints.length > 0) {
                setHints(data.hints);
            }

            // Check if correct
            if (data.isCorrect) {
                console.log('Correct solution!');
                // Here you could update user progress, show a success message, etc.
            }
        } catch (error) {
            console.error('Error checking solution:', error);
            setQueryResults([{ error: 'Failed to execute query' }]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 flex justify-center items-center">
                <div className="animate-pulse text-zinc-400">
                    Loading level {levelId}...
                </div>
            </div>
        );
    }

    if (error || !level) {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 flex flex-col justify-center items-center">
                <div className="text-red-400 mb-4">
                    {error || 'Level not found'}
                </div>
                <button
                    onClick={() => router.push('/game')}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-md text-sm font-medium"
                >
                    Return to Level Selection
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-zinc-100">
                        {level.name}
                    </h1>
                    <button
                        onClick={() => router.push('/game')}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-md text-sm font-medium"
                    >
                        &larr; Back to Levels
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Character Section */}
                    <div className="lg:col-span-1 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-zinc-800 rounded-full mb-4"></div>
                            <div className="text-zinc-200 text-center">
                                <h3 className="text-xl font-bold mb-2">
                                    SQL Master
                                </h3>
                                <p className="text-zinc-300 min-h-[100px]">
                                    {textPages[currentTextIndex]}
                                </p>
                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={goToPrevious}
                                        disabled={currentTextIndex === 0}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                            currentTextIndex === 0
                                                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-zinc-600'
                                        }`}
                                    >
                                        &larr; Back
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        disabled={
                                            currentTextIndex ===
                                            textPages.length - 1
                                        }
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                            currentTextIndex ===
                                            textPages.length - 1
                                                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-zinc-600'
                                        }`}
                                    >
                                        Next &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor and Results Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* SQL Editor */}
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                            <div className="h-[200px]">
                                <MonacoEditor
                                    height="100%"
                                    defaultLanguage="sql"
                                    theme="vs-dark"
                                    value={sqlQuery}
                                    onChange={(value) =>
                                        setSqlQuery(value || '')
                                    }
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 16,
                                        lineNumbers: 'on',
                                        roundedSelection: false,
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                            </div>
                            <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
                                <span className="text-zinc-400 text-sm">
                                    Πατήστε Ctrl+Enter για να εκτελέσετε το
                                    ερώτημα
                                </span>
                                <button
                                    onClick={checkSolution}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-md text-sm font-medium border border-zinc-700 hover:border-zinc-600 transition-all"
                                >
                                    Execute Query
                                </button>
                            </div>
                        </div>

                        {/* Hints Section */}
                        {hints.length > 0 && (
                            <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-800">
                                <h3 className="text-yellow-200 font-bold mb-2">
                                    Υποδείξεις
                                </h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {hints.map((hint, index) => (
                                        <li
                                            key={index}
                                            className="text-yellow-300"
                                        >
                                            <span className="font-semibold">
                                                {hint.pattern}:
                                            </span>{' '}
                                            <span className="text-yellow-100">
                                                {hint.hint}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Results Section */}
                        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                            <h3 className="text-zinc-200 font-bold mb-2">
                                Αποτελέσματα
                            </h3>
                            <div className="bg-zinc-950 rounded p-4 min-h-[200px] overflow-x-auto">
                                {queryResults.length > 0 ? (
                                    <table className="w-full text-sm text-left text-zinc-300">
                                        <thead className="text-xs uppercase bg-zinc-800 text-zinc-200">
                                            <tr>
                                                {Object.keys(
                                                    queryResults[0]
                                                ).map((header) => (
                                                    <th
                                                        key={header}
                                                        className="px-4 py-3"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {queryResults.map(
                                                (row, rowIndex) => (
                                                    <tr
                                                        key={rowIndex}
                                                        className={
                                                            rowIndex % 2 === 0
                                                                ? 'bg-zinc-900'
                                                                : 'bg-zinc-850'
                                                        }
                                                    >
                                                        {Object.values(row).map(
                                                            (
                                                                value,
                                                                cellIndex
                                                            ) => (
                                                                <td
                                                                    key={
                                                                        cellIndex
                                                                    }
                                                                    className="px-4 py-2 border-t border-zinc-800"
                                                                >
                                                                    {value?.toString() ||
                                                                        ''}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-zinc-400">
                                        Δεν υπάρχουν αποτελέσματα ακόμα
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
