import React from 'react';
import * as styles from './services.module.scss';

const Services = ({ bottomPadding, topPadding, services }) => {
    const renderServices = () => {
        return services.map(({icon, content}, index) => {
            const imageIcon = icon?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
            const isZero = index % 2 === 0;
            const classRight = isZero ? styles.servicesBlockServiceRight : null;
            return (
                <div key={index} className={`${styles.servicesBlockService} ${classRight && classRight}`} data-aos={`fade-${isZero ? 'left' : 'right'}`}>
                    <div className="row">
                        <div className={`col-md-3 ${styles.servicesBlockIconCol}`}>
                            <div className={styles.servicesBlockIconBoxwrap}>
                                <div className={styles.servicesBlockIconBox}>
                                    <div className={styles.servicesBlockIconWrap}>
                                        <img src={imageIcon} className={styles.servicesBlockIcon} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`col-md-9 ${styles.servicesBlockContent}`} dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                </div>
            )
        })
    }

    return (
        <section className={styles.servicesBlock} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container">
                {services && renderServices()}
            </div>
        </section>
    )
}

export default Services;