"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TimelineItem {
    readonly year: string;
    readonly title: string;
    readonly description: string;
}

interface AboutData {
    readonly pageTitle: string;
    readonly story: unknown;
    readonly skills: readonly string[];
    readonly profileImage?: string | null;
    readonly timeline: readonly TimelineItem[];
}

interface AboutClientProps {
    aboutData: AboutData;
}

export default function AboutClient({ aboutData }: AboutClientProps) {
    return (
        <div className="flex-grow pt-32 px-6 pb-20 max-w-4xl mx-auto w-full">

            {/* Story Section */}
            <section className="mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-8"
                >
                    {aboutData.pageTitle}
                </motion.h1>

                {aboutData.profileImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="mb-8"
                    >
                        <Image
                            src={aboutData.profileImage}
                            alt="Profile"
                            width={200}
                            height={200}
                            className="rounded-2xl border border-white/10"
                        />
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg text-slate-300"
                >
                    {/* Story content would be rendered here if using MDX */}
                    <p>
                        I am a creative technologist obsessed with the intersection of design and code.
                        I don&apos;t just build websites; I build immersive digital worlds.
                    </p>
                    <p>
                        My philosophy is simple: <strong>Make it feel magic.</strong>
                    </p>
                    <p>
                        Whether it&apos;s a subtle micro-interaction or a full-blown 3D environment,
                        I believe the web should be an experience, not just a document.
                    </p>
                </motion.div>

                {/* Skills */}
                {aboutData.skills && aboutData.skills.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-cyan-400 uppercase tracking-widest text-sm">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {aboutData.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Timeline Section */}
            {aboutData.timeline && aboutData.timeline.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-12 text-cyan-400 uppercase tracking-widest text-sm">Timeline</h2>
                    <div className="relative border-l border-white/10 ml-3 space-y-12">
                        {aboutData.timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-12"
                            >
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                <div className="text-sm font-mono text-slate-500 mb-1">{item.year}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
