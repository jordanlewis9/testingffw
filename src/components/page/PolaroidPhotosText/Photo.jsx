import React from 'react';
import * as styles from './photo.module.scss';

const Photo = ({ photo, index }) => {
    const image = photo?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    let containerClass, frameClass, imageClass, captionClass;

    if (index === 0) {
        containerClass = styles.polaroidTextVerticalOne;
    } else if (index === 1) {
        containerClass = styles.polaroidTextVerticalTwo;
    } else {
        containerClass = styles.polaroidTextHorizontal;
    }
    
    if (index === 0 || index === 1) {
        frameClass = styles.polaroidTextVerticalFrame;
        imageClass = styles.polaroidTextVerticalImage;
        captionClass = styles.polaroidTextVerticalCaption;
    } else {
        frameClass = styles.polaroidTextHorizontalFrame;
        imageClass = styles.polaroidTextHorizontalImage;
        captionClass = styles.polaroidTextHorizontalCaption;
    }

    return (
        <div className={containerClass}>
            <div className={frameClass} data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                {image && <div style={{ backgroundImage: `url('${image}')`}} className={`${imageClass} bg-cover`} />}
                {photo.caption && <div className={captionClass} dangerouslySetInnerHTML={{ __html: photo.caption }}></div>}
            </div>
        </div>
    )
}

export default Photo;