import React from 'react';
import * as styles from './singleicon.module.scss';

const SingleIcon = ({ item }) => {
    return (
        <li className={styles.iconListListItem}>
            <div className={`${styles.iconListIcon} bg-contain`} style={{ backgroundImage: `url('${item?.icon?.sourceUrl}')` }}></div>
            <span dangerouslySetInnerHTML={{ __html: item?.text }}></span>
        </li>
    )
}

export default SingleIcon;