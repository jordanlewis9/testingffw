import React from 'react';
import * as styles from './faqtaxarchiveheader.module.scss';

const FaqTaxArchiveHeader = ({ category }) => {
    
    return (
        <section className={`${styles.pageHeader}`}>
            <div className="container">
                <div className="row">
                    <div className={`col-md ${styles.pageHeaderLeftColumn}`}>
                        <div className={styles.pageHeaderInner}>
                            <h1 className={styles.pageHeaderTitle}>
                                FAQs: {category}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default FaqTaxArchiveHeader;