export type Project = {
    readonly title: { readonly name: string };
    readonly description: string;
    readonly tags: readonly string[];
    readonly link?: string;
    readonly status: "live" | "building" | "idea";
    readonly type?: string;
    readonly image?: string;
};
