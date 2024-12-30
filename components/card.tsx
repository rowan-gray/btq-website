"use client";
import { useRouter } from 'next/navigation';
export function Card({ children, link }: { children: React.ReactNode, link?: string }) {
    const router = useRouter();
    if (link) {
        return (
            <div onClick={() => (router.push(link))} className="rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg hover:cursor-pointer">
                {children}
            </div>
        )
    }
    
    return (
        <div className="rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg">
            {children}
        </div>
    )
}