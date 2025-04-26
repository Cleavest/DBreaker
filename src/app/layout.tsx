import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers';
import Navigation from '@/components/Navigation';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    title: 'DBreaker',
    description: 'Break through SQL with interactive games',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,79,255,0.1),rgba(255,255,255,0))]`}
            >
                <AuthProvider>
                    <Navigation />
                    <main className="min-h-screen">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
