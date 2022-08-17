import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SingleStatistic from './SingleStatistic';
import StatisticOverlay from './StatisticOverlay';
import * as styles from './statistics.module.scss';

const Statistics = ({ props }) => {
    const { preheading, heading, statistics, topPadding, bottomPadding } = props;
    const [bigStat, setBigStat] = useState();
    const [isStatOpen, setIsStatOpen] = useState(false);

    const variants = {
        hide: { opacity: 0 },
        show: { opacity: 1 }
    }

    const handleSingleClick = (label) => {
        setBigStat(label);
        setIsStatOpen(true);
    }

    const handleOverlayClick = () => {
        setTimeout(() => {
            setBigStat();
        }, 400);
        setIsStatOpen(false);
    }


    const renderStatistics = () => {
        return statistics.map((stat, index) => (
            <SingleStatistic key={stat.label} handleClick={handleSingleClick} bgImage={stat.image} stat={stat.statistic} label={stat.label} subheading={stat.subheading} index={index} />
        ))
    }

    const renderOverlay = () => {
        const overlay = [];
        statistics.forEach(stat => {
            if (stat.label === bigStat) {
                overlay.push(<StatisticOverlay bigStat={bigStat} handleClick={handleOverlayClick} bgImage={stat.image} statistic={stat.statistic} label={stat.label} subheading={stat.subheading} content={stat.content} />)
            }
        });
        return overlay;
    }

    return (
        <section className={styles.statisticsBlock} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container">
                <div className={`row align-items-center ${styles.statisticsBlockContainer}`}>
                    <div className={styles.statisticsBlockHeadingCol}>
                        {preheading && <div className={`${styles.statisticsBlockPreheading} h4`}>{preheading}</div>}
                        {heading && <h3 className={`${styles.statisticsBlockHeading} h1`}>{heading}</h3>}
                    </div>
                    <div className={styles.statisticsBlockStatsCol}>
                        <div className={`${styles.statisticsBlockStatsContainer} ${bigStat && styles.statisticsBlockStatsContainerNoBg}`}>
                            <motion.div className={styles.statisticsBlockStatsOverlay} initial={{ opacity: 1 }} animate={ isStatOpen ? "hide" : "show" } variants={variants} transition={{ duration: 0.05, delay: 0.2 }}>
                                {renderStatistics()}
                            </motion.div>     
                            {bigStat && renderOverlay()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Statistics;