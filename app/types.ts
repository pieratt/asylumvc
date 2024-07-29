export interface User {
    id: number;
    user_id: string;
    name: string;
    comment?: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    avatar: string;
    header: string;
    createdAt: Date;
    collections: Collection[];
    links: Link[];
}

export interface Collection {
    id: number;
    title: string;
    comment?: string;
    user_id: number;
    createdAt: Date;
    user: User;
    links: Link[];
}

export interface Link {
    id: number;
    url: string;
    title: string;
    user_id: number;
    collectionId?: number;
    categories: Category[];
    tags: Tag[];
    rank: number;
    comment?: string;
    createdAt: Date;
    user?: User;
    collection?: Collection;
}

export interface Category {
    id: number;
    name: string;
    icon: string;
    links: Link[];
}

export interface Tag {
    id: number;
    name: string;
    links: Link[];
}

export const categories: Category[] = [
    { id: 1, name: 'Buy', icon: '💎', links: [] },
    { id: 2, name: 'Learn', icon: '🧠', links: [] },
    { id: 3, name: 'Listen', icon: '🎵', links: [] },
    { id: 4, name: 'Look', icon: '👀', links: [] },
    { id: 5, name: 'Read', icon: '📖', links: [] },
    { id: 6, name: 'Watch', icon: '🎬', links: [] },
];

export const qualityOptions = [
    { name: 'on deck', icon: '++' },
    { name: 'great', icon: '+' },
    { name: 'canon', icon: '...' }
];