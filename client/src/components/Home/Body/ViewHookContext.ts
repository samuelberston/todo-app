import { createContext, Dispatch, SetStateAction } from 'react';

// Create the context to hold the setter function for listView
const ViewHookContext = createContext<Dispatch<SetStateAction<string>> | null>(null);

export { ViewHookContext };
