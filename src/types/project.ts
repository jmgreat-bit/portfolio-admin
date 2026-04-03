export type Project = {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    status: "live" | "building" | "idea";
    type?: string;
    image?: string;
};
