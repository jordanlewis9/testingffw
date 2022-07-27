import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import * as styles from './logo.module.scss';

const Logo = ({ link, logo }) => {
    let image;

    if (logo) {
        image = getImage(logo.localFile);
    }

    const renderLogo = () => {
        if (link) {
            return (
                <Link to={link.url} target={link.target} title={link.title} className={styles.scrollingLogosLogoLink}>
                    {image && <GatsbyImage image={image} alt={logo.altText} className={styles.scrollingLogosLogo} />}
                </Link>
            )
        } else {
            return (
                <>
                    {image && <GatsbyImage image={image} alt={logo.altText} className={styles.scrollingLogosLogo} />}
                </>
            )
        }
    }

    return (
        <div className={styles.scrollingLogosLogoWrap}>
            {renderLogo()}
        </div>
    )
}

export default Logo;