import React from 'react';
import loadable from '@loadable/component';

const Statistics = loadable(() => import('./Statistics'));

const StatisticsLazyLoad = (props) => {

    return (
        <>
            <Statistics props={props} />
        </>
    )
}

export default StatisticsLazyLoad;