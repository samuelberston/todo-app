import { createContext } from 'react';

interface List {
    id: string;
    name: string;
}

export const ListsContext = createContext<List[] | null>(null);