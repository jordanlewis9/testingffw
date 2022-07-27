import React from 'react';
import * as styles from './singlestatistic.module.scss';

const SingleStatistic = ({ bgImage, stat, label, subheading, handleClick, index }) => {
    const image = bgImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    const delay = (index + 1) * 50;

    const renderBackground = () => {
        if (image) {
            return (
                <div style={{ backgroundImage: `url('${image}')`}} className={styles.statisticsBlockStatSelector} data-aos="fade-up" data-aos-delay={delay}>
                <div className={styles.statisticsBlockSelectorInner}>
                    <div className={`${styles.statisticsBlockSelectorLabel} h4`}>
                        {label}
                    </div>
                    <div className={`${styles.statisticsBlockSelectorStat} h1`}>
                       {stat} 
                    </div>
                </div>
            </div>
            )
        } else {
            return (
                <div className={`${styles.statisticsBlockStatSelector} ${styles.statisticsBlockStatSelectorNoBg}`} data-aos="fade-up" data-aos-delay={delay}>
                <div className={styles.statisticsBlockSelectorInner}>
                    <div className={`${styles.statisticsBlockSelectorLabel} h4`}>
                        {label}
                    </div>
                    <div className={`${styles.statisticsBlockSelectorStat} h1`}>
                       {stat} 
                    </div>
                </div>
            </div>
            )
        }
    }

    return (
        <div key={label} className={styles.statisticsBlockSelectorWrap} onClick={() => handleClick(label)}>
            {renderBackground()}
        </div>
    )
}

export default SingleStatistic;