"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas & Insights", path: "/ideas" },
    { name: "Projects", path: "/projects" },
    { name: "Public Progress", path: "/progress" },
    { name: "Work With Me", path: "/work" },
    { name: "Chat", path: "/chat" },
    { name: "Support", path: "/support" },
    { name: "About", path: "/about" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
            <nav className="flex items-center gap-8 px-8 py-4 bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 mr-4 group">
                    <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase">Studio</span>
                    <span className="text-white font-bold text-lg tracking-tight group-hover:text-cyan-200 transition-colors">The Great Web</span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium transition-colors relative ${isActive ? "text-white" : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}
