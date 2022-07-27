import React from 'react';
import * as styles from './computerscreenshot.module.scss';


const ComputerScreenshot = ({ computerScreenshot }) => {
    const { bottomPadding, heading, topPadding, screenshot } = computerScreenshot;

    return (
        <section className={styles.computerScreenshot} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={`container-fluid ${styles.computerScreenshotContainer}`}>
                <div className="row">
                    <div className="col-md" data-aos="fade-up" data-aos-delay="100">
                        {heading && <h3 className={styles.computerScreenshotHeading}>{heading}</h3>}
                        <div className={`${styles.computerScreenshotComputer} bg-contain`}>
                            {screenshot && <div style={{ backgroundImage: `url('${screenshot.sourceUrl}')`}} className={`${styles.computerScreenshotComputerScreen} bg-cover`}></div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComputerScreenshot;