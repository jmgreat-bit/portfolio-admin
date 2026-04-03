"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProgressUpdate {
    readonly slug: string;
    readonly title: { readonly name: string };
    readonly date: string | null;
    readonly status: string;
    readonly image?: string | null;
    readonly videoUrl?: string;
}

interface ProgressClientProps {
    readonly updates: readonly ProgressUpdate[];
}

export default function ProgressClient({ updates }: ProgressClientProps) {
    const getStatusStyles = (status: string) => {
        if (status === 'shipped') {
            return "bg-green-500/20 border-green-500/50 text-green-300";
        } else if (status === 'in-progress') {
            return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
        }
        return "bg-purple-500/20 border-purple-500/50 text-purple-300";
    };

    const getStatusLabel = (status: string) => {
        if (status === 'shipped') return 'Shipped 🚀';
        if (status === 'in-progress') return 'In Progress 🚧';
        return 'Idea 💡';
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="flex-grow pt-32 px-6 pb-20 max-w-3xl mx-auto w-full">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Public Progress</h1>
                <p className="text-slate-400">Building in public. One commit at a time.</p>
            </div>

            <div className="space-y-8">
                {updates.length === 0 ? (
                    <p className="text-center text-slate-500">No updates yet. Check back soon!</p>
                ) : (
                    updates.map((update, i) => (
                        <motion.div
                            key={update.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-cyan-400 font-mono">
                                    {formatDate(update.date)}
                                </div>
                                <div className={`text-xs px-2 py-1 rounded border ${getStatusStyles(update.status)}`}>
                                    {getStatusLabel(update.status)}
                                </div>
                            </div>

                            {update.image && (
                                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                    <Image
                                        src={update.image}
                                        alt={update.title.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2">{update.title.name}</h3>

                            {update.videoUrl && (
                                <a
                                    href={update.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mt-2"
                                >
                                    <span>▶</span> Watch Video
                                </a>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
