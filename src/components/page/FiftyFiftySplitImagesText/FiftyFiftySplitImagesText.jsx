import React from 'react';
import * as styles from './fiftyfiftysplitimagestext.module.scss';

const FiftyFiftySplitImagesText = ({ animation, bottomPadding, content, imageOne, imageTwo, topPadding }) => {
    const renderImage = (image) => {
        const photo = image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

        return (
            <div className={styles.fiftySplitImageWrap}>
                <div style={{ backgroundImage: `url('${photo}')`}} className={`${styles.fiftySplitImage} bg-cover`}></div>
            </div>
        )
    }
    
    return (
        <section className={styles.fiftySplit} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container-fluid" data-aos={animation && animation}>
                <div className="row align-items-center">
                    <div className={`col-md-6 ${styles.fiftySplitImageCol}`}>
                        <div className={styles.fiftySplitImages}>
                            {imageOne && renderImage(imageOne)}
                            {imageTwo && renderImage(imageTwo)}
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles.fiftySplitContent}`} dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
        </section>
    )
}

export default FiftyFiftySplitImagesText;