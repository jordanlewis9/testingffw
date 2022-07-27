import React from 'react';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './logo.module.scss';

const Logo = ({ logo, index }) => {
    let image;

    const { link } = logo;

    if (logo.logo) {
        image = getImage(logo.logo.localFile);
    }

    const renderImage = () => {
        if (link) {
            return (
                <a href={link.url} title={link.title} target={link.target} className={`${styles.awardsAffiliationsLogoBox} ${styles.awardsAffiliationsLogoBoxLink}`}>
                    <div className={styles.awardsAffiliationsLogoWrap}>
                        {image && <GatsbyImage image={image} className={styles.awardsAffiliationsLogo} />}
                    </div>
                </a>
            )
        } else {
            return (
                <div className={styles.awardsAffiliationsLogoBox}>
                    <div className={styles.awardsAffiliationsLogoWrap}>
                        {image && <GatsbyImage image={image} className={styles.awardsAffiliationsLogo} />}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.awardsAffiliationsLogoCol} data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
            {renderImage()}
        </div>
    )
}

export default Logo;