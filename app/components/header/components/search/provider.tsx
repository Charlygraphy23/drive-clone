"use client"

import { PropsWithChildren } from 'react';
import SearchLayout from './components/searchLayout';
import SearchStateProvider from './store/provider';

const SearchProvider = ({ children }: PropsWithChildren) => {

    return (
        <SearchStateProvider>
            <SearchLayout>
                {children}
            </SearchLayout>
        </SearchStateProvider>
    )
}

export default SearchProvider