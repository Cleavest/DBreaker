'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-950">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-4xl font-bold text-zinc-200 mb-6">
                    Welcome to <span className="text-zinc-100">DBreaker</span>
                </h1>
                <p className="text-xl text-zinc-300 mb-8">
                    Break through SQL with interactive games and challenges
                </p>

                {session ? (
                    <div className="space-y-4">
                        <Link
                            href="/lessons"
                            className="inline-block bg-zinc-800 text-zinc-200 px-6 py-3 rounded-lg text-lg font-medium hover:bg-zinc-700 transition-colors"
                        >
                            Start Learning
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
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                            Learn
                        </h3>
                        <p className="text-zinc-300">
                            Interactive SQL tutorials designed for beginners
                        </p>
                    </div>
                    <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                            Practice
                        </h3>
                        <p className="text-zinc-300">
                            Real-world database challenges to test your skills
                        </p>
                    </div>
                    <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
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
    );
}
