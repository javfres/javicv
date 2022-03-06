

export type ResumeT = {

    name: string;

    titles: string[];

    links: {
        href: string;
        icon: string;
        text: string;
    }[];

    timeline: {
        title: string;
        desc: string;
        icon: string;
        year: string;
    }[];

    pdfMetadata: Record<string, string|string[]>;

};