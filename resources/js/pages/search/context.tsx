import { SearchContextProviderProps, SearchState } from '@/types';
import { createContext, useContext } from 'react';

const defaultValues = {
    domain: '',
    result: undefined,
};

export const SearchContext = createContext<SearchState>(defaultValues);

export const useSearchContext = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }

    return context;
};

export default function SearchContextProvider({ initialValues, children }: SearchContextProviderProps) {
    const initialState: SearchState = {
        ...defaultValues,
        ...initialValues,
    };

    return <SearchContext.Provider value={initialState}>{children}</SearchContext.Provider>;
}
