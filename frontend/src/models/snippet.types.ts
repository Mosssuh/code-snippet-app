export interface Tag {
    id: number;
    name: string;
}

export interface Language {
    id: number;
    name: string;
}

export interface Snippet {
    id: number;
    title: string;
    code: string;
    language: Language;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
}