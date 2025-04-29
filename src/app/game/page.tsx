'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// const mockLevels = [{ id: 1, name: 'Basic SELECT' }];

interface LevelData {
    id: number;
    name: string;
}

export default function GameLevelsPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [levels, setLevels] = useState<LevelData[]>();
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
            <div className=" bg-zinc-950 p-8 flex justify-center items-center">
                <div className="animate-pulse text-zinc-400">
                    {status === 'loading'
                        ? 'Loading...'
                        : 'Redirecting to login...'}
                </div>
            </div>
        );
    }

    return (
        <div className=" p-8">
            <div className="max-w-4xl mx-auto">
                <div className='space-y-1 mb-8 text-center'>
                    <h1 className="text-xl sm:text-3xl font-bold text-zinc-100">
                        SQL Challenge Levels
                    </h1>
                    <h2 className='text-sm md:text-xl text-zinc-400'>Choose any level and practice your SQL skills!</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-pulse text-zinc-400">
                            Loading levels...
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                        {levels?.map((level) => (
                            <Link
                                href={`/game/${level.id}`}
                                key={level.id}
                                className="bg-zinc-800/60 w-[90%] rounded-2xl p-4 md:p-6 hover:scale-[1.04] hover:bg-[radial-gradient(ellipse_100%_100%_at_100%_100%,rgba(120,79,255,0.1),rgba(255,255,255,0))]  transition-all duration-300 transform"
                            >
                                <div className="flex flex-col justify-between items-start gap-1">
                                    <h2 className="text-md md:text-xl font-bold text-zinc-100">
                                        {level.name}
                                    </h2>
                                    <p className="text-zinc-400 text-sm">
                                        Level {level.id}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <span className="text-zinc-300 text-sm flex flex-row gap-1">
                                        Start Challenge 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>

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
