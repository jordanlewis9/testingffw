import React from 'react';
import * as styles from './portfoliopageheader.module.scss';

const PortfolioPageHeader = ({ title }) => {

    const renderTitle = () => {
        let allTitles = [];
        title.forEach(cat => {
            allTitles.push(cat.name);
        })
        return allTitles.join(', ');
    }
    
    return (
        <section className={`${styles.pageHeader}`}>
            <div className="container">
                <div className="row">
                    <div className={`col-md ${styles.pageHeaderLeftColumn}`}>
                        <div className={styles.pageHeaderInner}>
                            <h1 className={styles.pageHeaderTitle}>
                                {renderTitle()}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PortfolioPageHeader;