'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import image_db from '@/assets/images/serrver.jpg'

interface Leader {
    name: string,
    score: number
}

export default function LeaderBoard() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [leaderboard, setLeaderboard] = useState<Leader[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            const fetchLeaderboard = async () => {
                setLoading(true);
                try {
                    const response = await fetch('/api/leaderboard');

                    if (!response.ok) {
                        throw new Error(
                            `Failed to fetch LeaderBoard: ${response.status}`
                        );
                    }

                    const data = await response.json();
                    const leaders = [
                        { name: 'Alice', score: 120 },
                        { name: 'Bob', score: 95 },
                        { name: 'Charlie', score: 90 },
                        { name: 'Diana', score: 85 },
                        { name: 'Eva', score: 80 },
                    ];

                    setLeaderboard(leaders);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching LeaderBoard:', error);
                    setLoading(false);
                }
            };

            fetchLeaderboard();
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
        <section className='container mx-auto px-4 leaderboard'>
            <div className='mt-12 rounded-3xl p-6 lg:p-8 bg-zinc-900 mx-auto w-full space-y-8 sm:w-[70%] lg:w-[50%]'>
                <h3 className='text-center text-2xl lg:text-3xl font-bold'>Top 10 Leaderboard</h3>
                <ul className="space-y-6">
                    {leaderboard.map((leader, index) => {
                        let bgColor = 'bg-zinc-700';

                        if (index === 0) bgColor = 'bg-yellow-400 text-black';
                        else if (index === 1) bgColor = 'bg-gray-300 text-black';
                        else if (index === 2) bgColor = 'bg-amber-900 text-white';

                        // const rowBg = index % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-800';

                        return (
                            <li key={index} className={`w-full px-4 py-2 rounded-2xl`}>
                                <div className="flex flex-row gap-4 items-center justify-between text-2xl">
                                    <div className="flex flex-row items-center gap-4 sm:gap-12 lg:gap-20">
                                        <span className={`py-2 px-4 rounded-xl ${bgColor}`}>
                                            {index + 1}
                                        </span>
                                        <span className='font-semibold'>{leader.name}</span>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <span className='font-black'>{leader.score}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 filter drop-shadow-[0_0_8px_rgba(255,200,0,0.8)] fill-amber-300 stroke-amber-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

            </div>
        </section>
    );
}
