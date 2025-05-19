'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import image_db from '@/assets/images/serrver.jpg'

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
    const [userlevel, setLevel] = useState<number>(0);

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
                    setLevels(data.levels);
                    setLevel(data.level);
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
        <>
            <section className='relative mb-20'>
                <Image className='w-full h-[400px] lg:h-[500px] object-cover' alt="Image of Server" src={image_db} />
                <div className="absolute backdrop-blur-[5px] h-full inset-0 bg-[rgba(16,10,35,0.4)]"></div>
                <div className='container px-4 text-center flex flex-col items-center justify-center gap-4 absolute inset-0 mx-auto'>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-200">
                        Become a SQL Pro, One Query at a Time
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-zinc-300 lg:w-[60%]">
                        Tackle real-world challenges, level up your query skills, and master databases through hands-on practice.
                    </p>

                </div>
            </section>
            <section className="container mx-auto px-4 mb-10">
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
                                level.id == userlevel ? (
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
                                        <div className="mt-8 flex flex-row items-center justify-between">
                                            <span className="text-zinc-300 text-sm flex flex-row gap-1">
                                                Start Challenge
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                </svg>

                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </div>

                                    </Link>

                                ) : (
                                    <div
                                        key={level.id}
                                        className="bg-zinc-800/10 w-[90%] rounded-2xl p-4 md:p-6"
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
                                                {level.id < userlevel ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 fill-green-900 ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                    </svg>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                )
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
