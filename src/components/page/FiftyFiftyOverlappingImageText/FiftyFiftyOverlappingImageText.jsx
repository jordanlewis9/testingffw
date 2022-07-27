import React, { useEffect, useRef } from 'react';
import Rellax from 'rellax';
import * as styles from './fiftyfiftyoverlappingimagetext.module.scss';

const FiftyFiftyOverlappingImageText = ({ animation, bottomPadding, content, heading, image, imageSide, subheading, textBackgroundColor, textColor, topPadding }) => {
    const photo = image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const rellaxRef = useRef();

    useEffect(() => {
        new Rellax(rellaxRef.current, {
            speed: 2,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });
    }, []);

    const containerClass = imageSide === "right" ? styles.fiftyOverlappingImageRight : styles.fiftyOverlappingImageLeft;

    const renderHeadings = () => {
        let combinedHeadings = null;
        let bigHeading = null;
        let smallHeading = null;
        if (heading || subheading) {
            if (heading) {
                bigHeading = <span className={`${styles.fiftyOverlappingHeading} text-${textColor}`}>{heading}</span>;
            }
            if (subheading) {
                smallHeading = <span className={`${styles.fiftyOverlappingSubheading} text-${textColor}`}>{subheading}</span>;
            }
        }
        return <h3 className={styles.fiftyOverlappingHeadingSubheading}>{bigHeading}<br/>{smallHeading}</h3>
    }

    return (
        <section className={`${styles.fiftyOverlapping} ${containerClass}`} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container container-no-padding" data-aos={animation && animation}>
                <div className="row">
                    <div className={`col-md-6 ${styles.fiftyOverlappingImageCol}`} ref={rellaxRef}>
                        {photo && <div className={`${styles.fiftyOverlappingImage} bg-cover rellax`} style={{ backgroundImage: `url('${photo}')`}}></div>}
                    </div>
                    <div className={`col-md-6 ${styles.fiftyOverlappingContentCol}`}>
                        <div className={`${styles.fiftyOverlappingContent} text-${textColor}`} style={{ backgroundColor: textBackgroundColor }}>
                            <div className={styles.fiftyOverlappingBackground} style={{ backgroundColor: textBackgroundColor }}></div>
                            <div className={styles.fiftyOverlappingInner}>
                                {(heading || subheading) && renderHeadings()}
                                <span dangerouslySetInnerHTML={{ __html: content }}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FiftyFiftyOverlappingImageText;