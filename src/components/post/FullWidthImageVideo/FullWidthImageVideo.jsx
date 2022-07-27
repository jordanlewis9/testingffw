import React, { useEffect } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './fullwidthimagevideo.module.scss';

const FullWidthImageVideo = ({ animation, bottomPadding, image, topPadding, video}) => {
    let photo, lity;

    useEffect(() => {
        const lity = require('lity');
    }, [])

    if (image) {
        photo = getImage(image.localFile);
    }

    const renderVideo = () => {
        return <a className={styles.fullImageVideoPlayLink} href={video} data-lity><span className={styles.fullImageVideoPlay}>Play</span></a>
    }

    return (
        <section className={styles.fullImageVideo} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className={styles.fullImageVideoInner}>
                {video && renderVideo()}
                {photo && <GatsbyImage image={photo} className={styles.fullImageVideoImage} alt={image.altText}></GatsbyImage>}
            </div>
        </section>
    )
}

export default FullWidthImageVideo;