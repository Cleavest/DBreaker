'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import image_db from '@/assets/images/serrver.jpg'

interface LevelProgress {
    id: number;
    userId: string;
    score: number;
    level: number;
}

interface User {
    id: string;
    score: number;
    createdAt: Date;
    currentLevelId: number;
    email: string;
    name: string;
    LevelProgress: LevelProgress[];
}


export default function Profile() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            const fetchProfile = async () => {
                setLoading(true);
                try {
                    const response = await fetch('/api/profile');

                    if (!response.ok) {
                        throw new Error(
                            `Failed to fetch LeaderBoard: ${response.status}`
                        );
                    }

                    const data: User = await response.json();
                    data.createdAt = new Date(data.createdAt);
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching LeaderBoard:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
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
            <div className="relative mb-10 lg:mb-20">
                <h2 className='text-center text-nowrap transform-center left-[50%] z-10 top-[30%] text-lg lg:text-4xl font-bold w-fit h-fit absolute px-4 text-white'>Profile</h2>
                <svg className="w-full drop-shadow-[0_18px_10px_rgba(0,0,0,0.4)]" viewBox="0 0 1440 220" preserveAspectRatio="none">
                    <path fill="#27272a" d="M0,160 C360,280 1080,40 1440,160 L1440,0 L0,0 Z"></path>
                </svg>
            </div>

            <section className='container px-4 mx-auto'>
                <div className='w-full flex flex-col lg:flex-row gap-4 justify-between'>
                    <div className='bg-zinc-800 text-white rounded-3xl p-6 lg:p-8 space-y-2 h-fit'>
                        <div className='flex flex-row gap-4 items-center'>
                            <div className='p-4 rounded-full bg-[radial-gradient(ellipse_100%_100%_at_0%_0%,rgba(120,79,255,0.8),rgba(255,255,255,0.08))]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 lg:size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            <div className='border-l border-zinc-500 p-2 space-y-2'>
                                <h2 className='ml-2 text-sm text-zinc-400 font-black'>{user?.email}</h2>
                                <h3 className='ml-2 text-3xl text-zinc-200 font-bold'>{user?.name}</h3>
                            </div>
                        </div>
                        <div className='text-md text-zinc-200 font-semibold'> Created: {user?.createdAt.toDateString()}</div>
                        <div className='text-2xl text-zinc-200 font-semibold flex flex-row gap-2 items-center'>
                            Total Score: {user?.score}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 filter drop-shadow-[0_0_8px_rgba(255,200,0,0.8)] fill-amber-300 stroke-amber-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                    </div>

                    <div className='bg-zinc-800 text-white rounded-3xl p-4 lg:p-8 w-full h-full'>
                        <h4 className='text-xl px-4 py-2 font-bold text-zinc-200'>Level Progress</h4>
                        <ul className="space-y-6">
                            {user?.LevelProgress.map((level, index) => {
                                const bgColor = index % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-900';
                                const bgColorLevel = index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-700';

                                return (
                                    <li key={index} className={`w-full ${bgColor} px-4 py-2 rounded-2xl`}>
                                        <div className="flex flex-row gap-4 items-center justify-between">
                                            <div className="flex flex-row items-center gap-4 sm:gap-12 lg:gap-20">
                                                <span className={`py-2 px-4 rounded-xl text-xl lg:text-2xl ${bgColorLevel}`}>
                                                    {level.level}
                                                </span>
                                                <span className='font-semibold text-md lg:text-2xl'>Level Complete</span>
                                            </div>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <span className=' text-xl lg:text-2xl font-black'>{level.score}</span>
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
                </div>
            </section>
        </>
    );
}
