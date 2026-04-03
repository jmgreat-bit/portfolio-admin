"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import Image from "next/image";

interface HomepageData {
    readonly tagline: string;
    readonly headline: string;
    readonly subheadline: string;
    readonly available: boolean;
    readonly ctaButtons: readonly { readonly label: string; readonly link: string; readonly style: string }[];
    readonly stats: readonly { readonly value: string; readonly label: string }[];
    readonly explorationsTagline: string;
    readonly explorationsHeadline: string;
    readonly explorationsDescription: string;
}

interface Project {
    readonly slug: string;
    readonly title: { readonly name: string };
    readonly description?: string | null;
    readonly image?: string | null;
    readonly status: string;
}

interface HomepageClientProps {
    homepageData: HomepageData;
    recentProjects: Project[];
}

export default function HomepageClient({ homepageData, recentProjects }: HomepageClientProps) {
    return (
        <div className="flex-grow flex flex-col justify-center px-6 pt-32 pb-20 max-w-[1400px] mx-auto w-full z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-6">
                        {homepageData.tagline}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                        {homepageData.headline}
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                        {homepageData.subheadline}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {homepageData.ctaButtons?.map((button, index) => (
                            <MagneticButton key={index}>
                                <Link
                                    href={button.link}
                                    className={
                                        button.style === 'primary'
                                            ? "px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-shadow"
                                            : "px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors"
                                    }
                                >
                                    {button.label}
                                </Link>
                            </MagneticButton>
                        ))}
                    </div>
                </motion.div>

                {/* Right Column: Signal Board */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center lg:justify-end"
                >
                    <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">
                            Signal Board
                        </div>

                        <div className="space-y-8">
                            {homepageData.stats?.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-5xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-slate-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative elements */}
                        <div className="mt-12 h-32 bg-gradient-to-t from-cyan-500/5 to-transparent rounded-xl border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Bottom Section: Recent Explorations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-32"
            >
                <div className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-4">
                    {homepageData.explorationsTagline}
                </div>
                <h2 className="text-4xl font-bold mb-4">{homepageData.explorationsHeadline}</h2>
                <p className="text-slate-400 mb-12">{homepageData.explorationsDescription}</p>

                {/* Recent Projects Grid */}
                {recentProjects.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {recentProjects.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="group block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
                            >
                                {project.image && (
                                    <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                                    {project.title.name}
                                </h3>
                                {project.description && (
                                    <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
