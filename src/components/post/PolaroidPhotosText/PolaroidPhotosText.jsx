import React from 'react';
import Photo from './Photo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './polaroidphotostext.module.scss';

const PolaroidPhotosText = ({ animation, bottomPadding, content, icon, link, topPadding, horizontalPhoto, verticalPhotoOne, verticalPhotoTwo }) => {
    const photosArray = [verticalPhotoOne, verticalPhotoTwo, horizontalPhoto];

    const renderPhotos = () => {
        return photosArray.map((photo, index) => <Photo photo={photo} index={index} key={index} />)
    }

    return (
        <section className={styles.polaroidText} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container" data-aos={animation && animation}>
                <div className="row align-items-center">
                    <div className={`col-md-7 ${styles.polaroidTextPhotosCol}`}>
                        {renderPhotos()}
                    </div>
                    <div className="col-md-5">
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                        {(icon && link) && 
                        <a href={link.url} target={link.target} title={link.title} className="iconlink-shortcode">
                            <FontAwesomeIcon icon={icon} />
                        </a>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PolaroidPhotosText;