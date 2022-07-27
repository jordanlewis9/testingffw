import React from 'react';
import * as styles from './portfoliopageheader.module.scss';

const PortfolioPageHeader = ({ title }) => {
    
    return (
        <section className={`${styles.pageHeader}`}>
            <div className="container">
                <div className="row">
                    <div className={`col-md ${styles.pageHeaderLeftColumn}`}>
                        <div className={styles.pageHeaderInner}>
                            <h1 className={styles.pageHeaderTitle}>
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PortfolioPageHeader;