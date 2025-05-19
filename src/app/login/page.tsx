'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import image from '@/assets/images/loginForm.jpg'

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials');
                return;
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            setError('Something went wrong');
        }
    };

    return (
        <>
            <section className='relative mb-20 conatiner mx-auto'>
                <Image className='w-full h-[400px] lg:h-[500px] object-cover' alt="Image of Login page" src={image} />
                <div className="absolute backdrop-blur-[5px] h-full inset-0 bg-[rgba(16,10,35,0.4)]"></div>
                <div className='container px-4 text-center flex flex-col items-center justify-center gap-4 absolute inset-0 mx-auto'>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-200 mt-14">
                        Sign in to your account
                    </h1>
                </div>
            </section>
            <section className="container mx-auto px-4 flex justify-center lg:px-8">
                <div className="max-w-md w-full space-y-8 mt-8">
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {error}
                            </div>
                        )}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 placeholder-zinc-500 text-zinc-200 rounded-t-md focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 focus:z-10 sm:text-sm bg-zinc-900"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 placeholder-zinc-500 text-zinc-200 rounded-b-md focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 focus:z-10 sm:text-sm bg-zinc-900"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-zinc-200 bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link
                            href="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
