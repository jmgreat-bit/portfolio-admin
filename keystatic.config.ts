import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: process.env.NODE_ENV === 'production' ? 'cloud' : 'local',
    },
    cloud: {
        project: 'jmgreat-bit/portfolio-admin',
    },
    collections: {
        insights: collection({
            label: 'Insights (Blog)',
            slugField: 'title',
            path: 'src/content/insights/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Date' }),
                tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
                featuredImage: fields.image({
                    label: 'Featured Image',
                    directory: 'public/images/insights',
                    publicPath: '/images/insights/',
                }),
                videoUrl: fields.url({ label: 'Video URL (YouTube, Vimeo, or direct link)' }),
                content: fields.mdx({ label: 'Content' }),
            },
        }),
        projects: collection({
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                type: fields.select({
                    label: 'Type',
                    options: [
                        { label: 'Animation', value: 'animation' },
                        { label: 'AI Experiment', value: 'ai' },
                        { label: 'Tool / Prototype', value: 'tool' },
                        { label: 'Short Film', value: 'film' },
                        { label: 'Web Experience', value: 'web' },
                    ],
                    defaultValue: 'animation',
                }),
                status: fields.select({
                    label: 'Status',
                    options: [
                        { label: 'Live', value: 'live' },
                        { label: 'Building', value: 'building' },
                        { label: 'Idea', value: 'idea' },
                    ],
                    defaultValue: 'building',
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
                description: fields.text({ label: 'Short Description', multiline: true }),
                link: fields.url({ label: 'Project Link' }),
                image: fields.image({
                    label: 'Thumbnail',
                    directory: 'public/images/projects',
                    publicPath: '/images/projects/',
                }),
                videoUrl: fields.url({ label: 'Demo Video URL (YouTube, Vimeo, or direct link)' }),
                gallery: fields.array(
                    fields.image({
                        label: 'Image',
                        directory: 'public/images/projects/gallery',
                        publicPath: '/images/projects/gallery/',
                    }),
                    { label: 'Gallery Images' }
                ),
            },
        }),
        progress: collection({
            label: 'Public Progress',
            slugField: 'title',
            path: 'src/content/progress/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Update Title' } }),
                date: fields.date({ label: 'Date' }),
                status: fields.select({
                    label: 'Status',
                    options: [
                        { label: 'Shipped 🚀', value: 'shipped' },
                        { label: 'In Progress 🚧', value: 'in-progress' },
                        { label: 'Idea 💡', value: 'idea' },
                    ],
                    defaultValue: 'in-progress',
                }),
                image: fields.image({
                    label: 'Update Image',
                    directory: 'public/images/progress',
                    publicPath: '/images/progress/',
                }),
                videoUrl: fields.url({ label: 'Video URL (optional)' }),
                content: fields.mdx({ label: 'Update Details' }),
            }
        })
    },
    singletons: {
        siteSettings: singleton({
            label: 'Site Settings',
            path: 'src/content/settings/site',
            schema: {
                siteTitle: fields.text({ label: 'Site Title', defaultValue: 'The Great Web' }),
                siteDescription: fields.text({ label: 'SEO Description', multiline: true }),
                logo: fields.image({
                    label: 'Logo',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                socialLinks: fields.object({
                    twitter: fields.url({ label: 'Twitter/X' }),
                    github: fields.url({ label: 'GitHub' }),
                    linkedin: fields.url({ label: 'LinkedIn' }),
                    youtube: fields.url({ label: 'YouTube' }),
                    instagram: fields.url({ label: 'Instagram' }),
                }, { label: 'Social Links' }),
            },
        }),
        homepage: singleton({
            label: 'Homepage',
            path: 'src/content/pages/homepage',
            schema: {
                // Hero Section
                tagline: fields.text({ label: 'Tagline (above headline)', defaultValue: 'Creative Technologist & Director' }),
                headline: fields.text({ label: 'Headline', multiline: true }),
                subheadline: fields.text({ label: 'Subheadline', multiline: true }),
                available: fields.checkbox({ label: 'Available for Work', defaultValue: true }),

                // CTA Buttons
                ctaButtons: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Button Text' }),
                        link: fields.text({ label: 'Link (e.g., /work, /contact)' }),
                        style: fields.select({
                            label: 'Style',
                            options: [
                                { label: 'Primary (Gradient)', value: 'primary' },
                                { label: 'Secondary (Outline)', value: 'secondary' },
                            ],
                            defaultValue: 'secondary',
                        }),
                    }),
                    { label: 'CTA Buttons' }
                ),

                // Signal Board Stats
                stats: fields.array(
                    fields.object({
                        value: fields.text({ label: 'Value (e.g., 12, 90+)' }),
                        label: fields.text({ label: 'Label (e.g., Active prototypes)' }),
                    }),
                    { label: 'Signal Board Stats' }
                ),

                // Recent Explorations Section
                explorationsTagline: fields.text({ label: 'Explorations Tagline', defaultValue: 'Ideas in Motion' }),
                explorationsHeadline: fields.text({ label: 'Explorations Headline', defaultValue: 'Recent explorations' }),
                explorationsDescription: fields.text({ label: 'Explorations Description', multiline: true }),
            },
        }),
        about: singleton({
            label: 'About Page',
            path: 'src/content/pages/about',
            schema: {
                pageTitle: fields.text({ label: 'Page Title', defaultValue: 'The Story' }),
                story: fields.mdx({ label: 'My Story' }),
                skills: fields.array(fields.text({ label: 'Skill' }), { label: 'Skills List' }),
                profileImage: fields.image({
                    label: 'Profile Image',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                timeline: fields.array(
                    fields.object({
                        year: fields.text({ label: 'Year' }),
                        title: fields.text({ label: 'Title' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                    }),
                    { label: 'Timeline' }
                ),
            }
        }),
        contact: singleton({
            label: 'Contact Page',
            path: 'src/content/pages/contact',
            schema: {
                headline: fields.text({ label: 'Headline', defaultValue: 'Get in Touch' }),
                description: fields.text({ label: 'Description', multiline: true }),
                email: fields.text({ label: 'Contact Email' }),
                calendlyUrl: fields.url({ label: 'Calendly Link (optional)' }),
            }
        }),
    },
});
