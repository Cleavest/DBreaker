import Link from "next/link";
import { useEffect } from "react";

interface ScoreStarsProps {
    score: number;
    level: number;
    onClose: () => void;
}

export default function ScoreStars({ score, level, onClose }: ScoreStarsProps) {

    useEffect(() => {
        document.body.classList.add('overflow-y-hidden');

        return () => {
            document.body.classList.remove('overflow-y-hidden');
        };
    }, []);

    return (
        <div className="fixed backdrop-blur-xs w-full h-full inset-0 z-20 ">
            <div className="absolute top-[50%] left-[50%] z-30 transform -translate-x-1/2 -translate-y-1/2 container mx-auto">
                <div className="p-10 rounded-3xl bg-zinc-700 w-[80%] lg:w-[50%] mx-auto space-y-4 relative">
                    <button className="absolute top-0 right-0 p-2 hover:cursor-pointer" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-center text-2xl lg:text-4xl font-bold">Congratulations!🎉</h2>
                    <div className="flex justify-center items-center gap-1">
                        {Array.from({ length: 3 }, (_, i) => (
                            <span key={i}>
                                {i < score && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 lg:size-14 filter drop-shadow-[0_0_8px_rgba(255,200,0,0.8)] fill-amber-300 stroke-amber-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                )}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link href={`/game/${level}`} className='text-white border hover:border-transparent border-zinc-700 hover:cursor-pointer hover:scale-[1.02] active:scale-[0.95] px-8 py-2 text-md md:text-xl font-bold bg-[rgba(255,255,255,0.05)] hover:bg-[radial-gradient(ellipse_100%_100%_at_100%_80%,rgba(120,79,255,0.3),rgba(255,255,255,0.08))] rounded-xl !w-fit'>
                            Next Game!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
