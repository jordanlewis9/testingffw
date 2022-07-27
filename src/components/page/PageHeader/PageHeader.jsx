import React, { useContext, useEffect } from 'react';
import { PagePropsContext } from '../../global/GlobalContext';
import Checklist from './Checklist';
import * as styles from './pageheader.module.scss';

const PageHeader = ({ pageTitle, includeChecklist, checklistToShow }) => {
    const { pageProps } = useContext(PagePropsContext);

    useEffect(() => {
        if (typeof Storage !== 'undefined') {
            if (pageProps?.pageContext?.id) {
                let currentPagesVisited = JSON.parse(sessionStorage.getItem('pagesVisited'));
        
                if (currentPagesVisited) {
                    if (currentPagesVisited.some((page) => page === pageProps.pageContext.id)) {
                        return;
                    } else {
                        currentPagesVisited.push(pageProps.pageContext.id);
                        sessionStorage.setItem('pagesVisited', JSON.stringify(currentPagesVisited));
                    }
                } else {
                    let firstPageVisited = [pageProps.pageContext.id];
                    sessionStorage.setItem('pagesVisited', JSON.stringify(firstPageVisited));
                }
            }
        }
    }, [])

    
    return (
        <section className={`${styles.pageHeader} ${includeChecklist && styles.pageHeaderHasChecklist}`}>
            <div className="container">
                <div className="row">
                    <div className={`col-md ${styles.pageHeaderLeftColumn}`}>
                        <div className={styles.pageHeaderInner}>
                            <h1 className={styles.pageHeaderTitle}>
                                {pageTitle}
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-7">
                        {includeChecklist && <Checklist checklist={checklistToShow} />}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PageHeader;