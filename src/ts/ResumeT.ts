

import nunjucks from 'nunjucks';

type strT = string | nunjucks.runtime.SafeString;

export function html(strings:TemplateStringsArray) {
    return new nunjucks.runtime.SafeString(strings.join(' ').trim());
};

type SkillT = {
    text: string;
    title?: string;
}

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

    about: strT;
    skills: (SkillT|string)[];
    experience: {
        company: string;
        start: number|string;
        end?: number|string;
        place: string;
        logo: string;
        description?: strT;
        positions: {
            title: string;
            tags?: string[];
            description: strT;
        }[]; 
    }[];

    pdfMetadata: Record<string, string|string[]>;

};