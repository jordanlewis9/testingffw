import { divide } from 'lodash';
import React, { lazy, Suspense } from 'react';
const PortfolioItemsLeftTextRight = lazy(() => import('./PortfolioItemsLeftTextRight'));

const PortfoliosDelay = (props) => {

    const isSSR = typeof window === "undefined";
    return (
        <>
            {!isSSR && <Suspense fallback={<h1>Loading...</h1>}>
                <PortfolioItemsLeftTextRight props={props}/>
            </Suspense>}
        </>
    )
}

export default PortfoliosDelay;