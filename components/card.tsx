"use client";
import Link from 'next/link';

export function Card({ children, link }: { children: React.ReactNode, link?: string }) {
    if (link) {
        return (
            <Link href={link} passHref>
                <div
                    className="rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg hover:cursor-pointer"
                    rel="noopener noreferrer" // Security measure
                >
                    {children}
                </div>
            </Link>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg">
            {children}
        </div>
    );
}