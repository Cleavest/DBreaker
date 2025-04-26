'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for levels
const mockLevels = [
    { id: 1, name: 'Basic SELECT', difficulty: 'Easy' },
    { id: 2, name: 'Filtering with WHERE', difficulty: 'Easy' },
    { id: 3, name: 'Sorting with ORDER BY', difficulty: 'Medium' },
    { id: 4, name: 'Joining Tables', difficulty: 'Hard' },
    { id: 5, name: 'Aggregation Functions', difficulty: 'Hard' },
];

export default function GameLevelsPage() {
    // In a real app, you would fetch levels from your backend
    const [levels, setLevels] = useState(mockLevels);
    const [loading, setLoading] = useState(false);

    // Simulate loading levels from an API
    useEffect(() => {
        const fetchLevels = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/levels');

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch levels: ${response.status}`
                    );
                }

                const data = await response.json();
                setLevels(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching levels:', error);
                setLoading(false);
            }
        };

        fetchLevels();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-zinc-100 mb-8">
                    SQL Challenge Levels
                </h1>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-pulse text-zinc-400">
                            Loading levels...
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {levels.map((level) => (
                            <Link
                                href={`/game/${level.id}`}
                                key={level.id}
                                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-zinc-100">
                                        {level.name}
                                    </h2>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${
                                            level.difficulty === 'Easy'
                                                ? 'bg-green-900 text-green-200'
                                                : level.difficulty === 'Medium'
                                                ? 'bg-yellow-900 text-yellow-200'
                                                : 'bg-red-900 text-red-200'
                                        }`}
                                    >
                                        {level.difficulty}
                                    </span>
                                </div>
                                <p className="text-zinc-400 text-sm">
                                    Level {level.id}
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <span className="text-zinc-300 text-sm">
                                        Start Challenge &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
