"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import WebGLBackground from "@/components/visuals/WebGLBackground";
import Link from "next/link";

const skills = [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Three.js", "WebGL", "Framer Motion", "Node.js",
    "AI Agents", "System Architecture"
];

const services = [
    { title: "Freelance Development", desc: "I build high-performance websites and applications." },
    { title: "Consulting", desc: "Expert advice on architecture, performance, and AI integration." },
    { title: "Technical Writing", desc: "Deep-dive articles and documentation for developer tools." }
];

export default function WorkPageClient() {
    return (
        <main className="relative min-h-screen flex flex-col text-white">
            <WebGLBackground />
            <Header />

            <div className="flex-grow pt-32 px-6 pb-20 max-w-5xl mx-auto w-full relative z-10">

                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    {/* Left Column: Skills & Services */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-8"
                        >
                            Work With Me
                        </motion.h1>

                        <div className="mb-12">
                            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">My Toolkit</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-6">How I Can Help</h3>
                            <div className="space-y-6">
                                {services.map((s, i) => (
                                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                                        <p className="text-slate-400 text-sm">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Call to Action */}
                    <div className="flex items-center">
                        <div className="w-full p-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-white/10 rounded-3xl backdrop-blur-xl text-center">
                            <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
                            <p className="text-slate-300 mb-8">
                                I am currently <strong>available</strong> for new projects. Let's discuss your vision.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-50 transition-colors"
                            >
                                Start a Project
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
