'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const mockLevels = [{ id: 1, name: 'Basic SELECT' }];

interface LevelData {
    id: number;
    name: string;
}

export default function GameLevelsPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [levels, setLevels] = useState<LevelData[]>(mockLevels);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
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
        }
    }, [status]);

    if (status === 'loading' || status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 flex justify-center items-center">
                <div className="animate-pulse text-zinc-400">
                    {status === 'loading'
                        ? 'Loading...'
                        : 'Redirecting to login...'}
                </div>
            </div>
        );
    }

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
