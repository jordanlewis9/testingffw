import React, { useState, useEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import * as styles from './statisticoverlay.module.scss';


const StatisticOverlay = ({ bigStat, bgImage, statistic, label, subheading, content, handleClick }) => {
    const image = bgImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true)
    }, []);

    const variants = {
        open: { y: 0 },
        closed: { y: 300 }
    }

    const handleClose = () => {
        handleClick();
        setIsOpen(false);
    }

    return (
        <motion.div key={label} className={styles.statisticsBlockContentWrap} initial={{ y: 300 }} animate={ isOpen ? "open" : "closed" } variants={variants} transition={{ duration: 0.4 }}>
            <div className={`${styles.statisticsBlockStatContent} text-white`}>
                <button className={styles.statisticsBlockClose} onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {image && <div style={{ backgroundImage: `url('${image}')`}} className={`${styles.statisticsBlockStatImage} bg-cover`} />}
                <div className={`${styles.statisticsBlockStat} h1`}>{statistic}</div>
                {label && <div className={`${styles.statisticsBlockStatLabel} h3 text-white`}>{label}</div>}
                {subheading && <div className={`${styles.statisticsBlockStatSubheading} h4`}>{subheading}</div>}
                <div className="triangles-shortcode"></div>
                <div dangerouslySetInnerHTML={{ __html: content}}></div>
            </div>
        </motion.div>
    )
}

export default StatisticOverlay;