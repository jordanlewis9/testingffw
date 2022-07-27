import React from 'react';
import Point from './Point';
import * as styles from './pointswithlinks.module.scss';

const PointsWithLinks = ({ animation, bottomPadding, heading, points, topPadding }) => {
    const renderPoints = () => {
        return points.map((point, index) => <Point point={point} key={index} />);
    }
    return (
        <section className={styles.pointsLinks} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container container-no-padding" data-aos={animation && animation}>
                <div className={styles.pointsLinksBox}>
                    {heading && 
                    <div className={styles.pointsLinksHeadingWrap}>
                        <h3 className={styles.pointsLinksHeading}>{heading}</h3>
                    </div>
                    }
                    {points?.length > 0 && 
                    <ul className={styles.pointsLinksList}>
                        {renderPoints()}
                    </ul>
                    }
                </div>
            </div>
        </section>
    )
}

export default PointsWithLinks;