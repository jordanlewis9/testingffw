import React from 'react';
import * as styles from './fortysixtytextimage.module.scss';

const FortySixtyTextImage = ({ animation, backgroundColor, bottomPadding, content, image, imageSide, textColor, topPadding }) => {
    const photo = image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    const imageClass = imageSide === "right" ? styles.fortyImageImageRight : styles.fortyImageImageLeft;

    return (
        <section className={styles.fortyImage} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container" data-aos={animation && animation}>
                <div className="row">
                    {photo && <div className={`col-md-7 ${styles.fortyImageImage} ${imageClass} bg-cover`} style={{ backgroundImage: `url('${photo}')`}}></div>}
                    <div className={`col-md-5 ${styles.fortyImageContent} text-${textColor}`} style={{ backgroundColor }} dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
        </section>
    )
}

export default FortySixtyTextImage;