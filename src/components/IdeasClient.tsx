"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Insight {
    slug: string;
    title: { name: string };
    date: string | null;
    tags: string[];
    featuredImage?: string;
    videoUrl?: string;
}

interface IdeasClientProps {
    insights: Insight[];
}

export default function IdeasClient({ insights }: IdeasClientProps) {
    const [activeSlug, setActiveSlug] = useState(insights[0]?.slug || '');
    const activeInsight = insights.find((i) => i.slug === activeSlug) || insights[0];

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (insights.length === 0) {
        return (
            <div className="flex-grow pt-32 px-6 pb-20 max-w-6xl mx-auto w-full">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Ideas & Insights</h1>
                    <p className="text-slate-400">No insights yet. Add some in the Keystatic dashboard!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-grow pt-32 px-6 pb-20 max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-12 gap-12 h-[calc(100vh-200px)]">

                {/* Sidebar List */}
                <div className="md:col-span-4 border-r border-white/10 pr-6 overflow-y-auto custom-scrollbar">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Latest Insights</h2>
                    <div className="space-y-4">
                        {insights.map((insight) => (
                            <button
                                key={insight.slug}
                                onClick={() => setActiveSlug(insight.slug)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${activeSlug === insight.slug
                                    ? "bg-white/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                                    : "hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <div className="text-sm text-cyan-400 mb-1">{formatDate(insight.date)}</div>
                                <div className="font-semibold text-lg">{insight.title.name}</div>
                                {insight.tags && insight.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {insight.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-8 pl-6 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeInsight && (
                            <motion.div
                                key={activeSlug}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="prose prose-invert prose-lg max-w-none"
                            >
                                <h1 className="text-3xl font-bold mb-4">{activeInsight.title.name}</h1>

                                {activeInsight.featuredImage && (
                                    <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                                        <Image
                                            src={activeInsight.featuredImage}
                                            alt={activeInsight.title?.name || "Featured image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {activeInsight.videoUrl && (
                                    <a
                                        href={activeInsight.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
                                    >
                                        <span>▶</span> Watch Video
                                    </a>
                                )}

                                <p className="text-slate-400">
                                    Content will be rendered here from MDX. Edit this insight in the Keystatic dashboard.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
