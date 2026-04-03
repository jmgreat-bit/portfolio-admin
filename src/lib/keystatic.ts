import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

// Projects
export async function getProjects() {
    const projects = await reader.collections.projects.all();
    return projects.map((project) => ({
        slug: project.slug,
        ...project.entry,
        status: (project.entry.status as "live" | "building" | "idea") || "building",
        tags: (project.entry.tags || []) as string[],
        link: project.entry.link || undefined,
        image: project.entry.image || undefined,
        videoUrl: project.entry.videoUrl || undefined,
        gallery: project.entry.gallery || [],
    }));
}

// Insights (Blog/Ideas)
export async function getInsights() {
    const insights = await reader.collections.insights.all();
    return insights.map((insight) => ({
        slug: insight.slug,
        title: insight.entry.title,
        date: insight.entry.date,
        tags: (insight.entry.tags || []) as string[],
        featuredImage: insight.entry.featuredImage || undefined,
        videoUrl: insight.entry.videoUrl || undefined,
        // Note: content is excluded here as it's a function that can't be passed to client components
    }));
}


export async function getInsight(slug: string) {
    const insight = await reader.collections.insights.read(slug);
    if (!insight) return null;
    return {
        ...insight,
        tags: (insight.tags || []) as string[],
    };
}

// Public Progress
export async function getPublicProgress() {
    const updates = await reader.collections.progress.all();
    return updates.map((update) => ({
        slug: update.slug,
        title: update.entry.title,
        date: update.entry.date,
        status: update.entry.status || 'in-progress',
        image: update.entry.image || undefined,
        videoUrl: update.entry.videoUrl || undefined,
        // Note: content is excluded here as it's a function that can't be passed to client components
    }));
}


// Homepage
export async function getHomepageData() {
    const homepage = await reader.singletons.homepage.read();
    if (!homepage) {
        return {
            tagline: 'Creative Technologist & Director',
            headline: 'Building humane systems, cinematic web experiences, and lightweight 3D moments.',
            subheadline: 'I help ambitious teams craft Stripe-level polish with bespoke motion, agent-friendly workflows, and calm product direction.',
            available: true,
            ctaButtons: [
                { label: 'Hire Me', link: '/work', style: 'primary' },
                { label: 'Collaborate', link: '/work', style: 'secondary' },
                { label: 'Support My Work', link: '/support', style: 'secondary' },
            ],
            stats: [
                { value: '12', label: 'Active prototypes' },
                { value: '08', label: 'Collabs this year' },
                { value: '90+', label: 'Stories captured' },
            ],
            explorationsTagline: 'Ideas in Motion',
            explorationsHeadline: 'Recent explorations',
            explorationsDescription: 'A sampling of live projects, R&D experiments, and cinematic web builds.',
        };
    }
    return homepage;
}

// About
export async function getAboutData() {
    const about = await reader.singletons.about.read();
    if (!about) {
        return {
            pageTitle: 'The Story',
            story: null,
            skills: [],
            profileImage: undefined,
            timeline: [
                { year: '2025', title: 'The Genius Era', description: 'Launched this portfolio. Started building autonomous design agents.' },
                { year: '2024', title: 'Senior Engineer', description: 'Led frontend architecture at TechCorp. Mastered Next.js and WebGL.' },
            ],
        };
    }
    return about;
}

// Site Settings
export async function getSiteSettings() {
    const settings = await reader.singletons.siteSettings.read();
    if (!settings) {
        return {
            siteTitle: 'The Great Web',
            siteDescription: 'Creative Technologist & Director',
            logo: undefined,
            socialLinks: {
                twitter: undefined,
                github: undefined,
                linkedin: undefined,
                youtube: undefined,
                instagram: undefined,
            },
        };
    }
    return settings;
}

// Contact
export async function getContactData() {
    const contact = await reader.singletons.contact.read();
    if (!contact) {
        return {
            headline: 'Get in Touch',
            description: 'Have a project in mind? Let\'s discuss.',
            email: '',
            calendlyUrl: undefined,
        };
    }
    return contact;
}
