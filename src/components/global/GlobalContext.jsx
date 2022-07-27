import React, { createContext } from 'react';

export const PagePropsContext = createContext();

export const PagePropsProvider = ({ children, pageProps }) => {

    const value = {
        pageProps
    }

    return (
        <PagePropsContext.Provider value={value}>
            {children}
        </PagePropsContext.Provider>
    )
}