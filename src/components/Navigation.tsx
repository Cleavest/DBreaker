'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
    const { data: session } = useSession();

    return (
        <nav className="bg-zinc-900 shadow-lg border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-xl font-bold text-zinc-200"
                            >
                                DBreaker
                            </Link>
                        </div>
                        {session && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center space-x-4">
                                <Link
                                    href="/game"
                                    className="text-zinc-300 hover:text-zinc-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Game
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-zinc-300 hover:text-zinc-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/leaderboard"
                                    className="text-zinc-300 hover:text-zinc-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Leaderboard
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        {session ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-zinc-300 hidden sm:block">
                                    Welcome,{' '}
                                    <span className="text-zinc-200">
                                        {session.user?.name}
                                    </span>
                                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-md text-sm font-medium border border-zinc-700 hover:border-zinc-600 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-zinc-300 hover:text-zinc-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
