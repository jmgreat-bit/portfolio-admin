"use client";

import { ReactNode } from "react";

type ProjectCardProps = {
    children: ReactNode;
    className?: string;
};

export default function ProjectCard({ children, className = "" }: ProjectCardProps) {
    return (
        <div
            className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10 ${className}`}
        >
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
            </div>
            <div className="relative">{children}</div>
        </div>
    );
}
