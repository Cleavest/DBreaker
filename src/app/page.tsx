'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import image_db from '@/assets/images/table_visualization.jpg';
import Link from 'next/link';

export default function Home() {
    const { data: session } = useSession();

    return (
        <>
            <section className='relative'>
                <Image className='w-full h-[400px] lg:h-[500px] object-cover' alt="Image of Database Table Visualization" src={image_db} />
                <div className="absolute backdrop-blur-[5px] h-full inset-0 bg-[rgba(16,10,35,0.4)]"></div>
                <div className='container px-4 flex flex-col justify-center gap-6 absolute inset-0 mx-auto'>
                    <h1 className="text-4xl font-bold text-zinc-200">
                        Welcome to <span className="text-zinc-100">DBreaker</span>
                    </h1>
                    <p className="text-xl text-zinc-300">
                        Break through SQL with interactive games and challenges
                    </p>
                    {session ? (
                        <div className="space-y-4">
                            <Link
                                href="/game"
                            >
                                <button
                                    className="overflow-hidden w-32 p-2 h-12 bg-zinc-900 text-white border-none rounded-md text-sm font-bold cursor-pointer relative z-10 group"
                                >
                                    Start Learning!
                                    <span
                                        className="absolute w-36 h-32 -top-8 -left-2 bg-[#392d64] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
                                    ></span>
                                    <span
                                        className="absolute w-36 h-32 -top-8 -left-2 bg-[#443084]/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
                                    ></span>
                                    <span
                                        className="absolute w-36 h-32 -top-8 -left-2 bg-[#2c2445]/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
                                    ></span>
                                    <span
                                        className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-[30%] left-[25%] z-10"
                                    >Lets Play!</span>
                                </button>

                            </Link>


                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link
                                href="/login"
                                className="inline-block bg-zinc-800 text-zinc-200 px-6 py-3 rounded-lg text-lg font-medium hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-all"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="inline-block bg-zinc-800 text-zinc-200 px-6 py-3 rounded-lg text-lg font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <section className='container px-4 mx-auto'>
                <div className=" flex flex-col items-center justify-center px-8 py-18 bg-[radial-gradient(ellipse_80%_40%_at_50%_-20%,rgba(120,79,255,0.1),rgba(255,255,255,0))]">
                    <div className="w-full text-center">
                        <h1 className="text-3xl font-bold text-zinc-200 mb-6">
                            Level Up Your SQL Skills
                        </h1>
                        <p className="text-lg mx-auto lg:w-4/5 text-zinc-300 mb-8">
                            From beginner tutorials to advanced challenges — learn, practice, and master SQL the interactive way.
                        </p>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-lg bg-zinc-900/50 shadow-lg shadow-zinc-600/30">
                                <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                                    Learn
                                </h3>
                                <p className="text-zinc-300">
                                    Interactive SQL tutorials designed for beginners
                                </p>
                            </div>
                            <div className="p-6 rounded-lg bg-zinc-900/50 shadow-lg shadow-zinc-600/30">
                                <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                                    Practice
                                </h3>
                                <p className="text-zinc-300">
                                    Real-world database challenges to test your skills
                                </p>
                            </div>
                            <div className="p-6 rounded-lg bg-zinc-900/50 shadow-lg shadow-zinc-600/30">
                                <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                                    Master
                                </h3>
                                <p className="text-zinc-300">
                                    Advanced concepts through hands-on exercises
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
