import React from 'react';
import * as styles from './singleicon.module.scss';

const SingleIcon = ({ item }) => {
    const icon = item?.icon?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    return (
        <li className={styles.iconListListItem}>
            <div className={`${styles.iconListIcon} bg-contain`} style={{ backgroundImage: `url('${icon}')` }}></div>
            <span dangerouslySetInnerHTML={{ __html: item?.text }}></span>
        </li>
    )
}

export default SingleIcon;