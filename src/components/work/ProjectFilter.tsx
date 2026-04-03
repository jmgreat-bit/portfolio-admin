"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ui/ProjectCard";
import Link from "next/link";

type ProjectFilterProps = {
    projects: Project[];
};

const tabs = ["All", "Live", "Building", "Idea"];

export default function ProjectFilter({ projects }: ProjectFilterProps) {
    const [activeTab, setActiveTab] = useState("All");

    const filteredProjects = projects.filter((project) => {
        if (activeTab === "All") return true;
        return project.status.toLowerCase() === activeTab.toLowerCase();
    });

    return (
        <div className="space-y-10">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative rounded-full px-6 py-2 text-sm font-medium transition-colors ${activeTab === tab ? "text-white" : "text-slate-400 hover:text-white"
                            }`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.title} className="flex flex-col h-full">
                            <div className="flex items-center justify-between text-sm text-white/60">
                                <span className="uppercase tracking-[0.3em] text-xs">{project.status}</span>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 flex-grow space-y-3">
                                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                                <p className="text-white/70">{project.description}</p>
                            </div>
                            <Link
                                href={project.link ?? "#"}
                                className="mt-6 inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                View details <span className="ml-2">→</span>
                            </Link>
                        </ProjectCard>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
