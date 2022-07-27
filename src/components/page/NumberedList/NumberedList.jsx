import React from 'react';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import ListItem from './ListItem';
import * as styles from './numberedlist.module.scss';

const NumberedList = ({ animation, bottomPadding, introContent, list, topPadding, rightImage }) => {
    let image;

    if (rightImage) {
        image = getImage(rightImage.localFile);
    }

    const renderList = () => {
        return list.map((item, index) => <ListItem text={item.text} index={index} key={item.text} />);
    }

    return (
        <section className={styles.numberedList} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className={`container-fluid ${styles.numberedListContainer}`}>
                <div className="row">
                    <div className={`col-md-9 ${styles.numberedListLeftCol}`}>
                        {introContent && 
                        <div className={styles.numberedListIntroContent} dangerouslySetInnerHTML={{ __html: introContent }}></div>
                        }
                        {list.length > 0 && 
                        <ol className={styles.numberedListList}>
                            {renderList()}
                        </ol>
                        }
                    </div>
                    <div className={`col-md-3 ${styles.numberedListImageCol} hidden-xs d-none d-md-block d-lg-block d-xl-block`}>
                        {image && <GatsbyImage image={image} altText={image.altText} className={styles.numberedListImage} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NumberedList;