import React, { useEffect } from 'react';
import * as styles from './fiftyfiftytextvideoorimage.module.scss';

const FiftyFiftyTextVideoOrImage = ({ animation, bottomPadding, content, image, title, topPadding, video }) => {
    const photo = image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    let lity;

    useEffect(() => {
        const lity = require('lity');
    }, [])

    const renderMedia = () => {
        if (video && photo) {
            return (
                <div className="bg-cover" style={{ backgroundImage: `url('${photo}')`}}>
                    <a href={video} className={`${styles.fiftyVideoVideoLink} bg-cover`} data-lity>
                        <span className={styles.fiftyVideoVideoPlay}>Play</span>
                    </a>
                </div>
            )
        } else if (photo) {
            return <div className={`bg-cover ${styles.fiftyVideoImage}`} style={{ backgroundImage: `url('${photo}')`}}></div>
        }
    }

    return (
        <section className={styles.fiftyVideo} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={`container ${styles.fiftyVideoContainer}`}  data-aos={animation && animation}>
                <div className="row">
                    <div className={`col-md-6 ${styles.fiftyVideoContent}`} dangerouslySetInnerHTML={{ __html: content }}></div>
                    <div className={`col-md-6 ${styles.fiftyVideoVideoCol}`}>
                        <div className={styles.fiftyVideoVideoWrap}>
                            {renderMedia()}
                            {title && <div className={styles.fiftyVideoTitleWrap}>
                                <div className={`h3 ${styles.fiftyVideoVideoTitle}`}>
                                    {title}
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FiftyFiftyTextVideoOrImage;