import React from 'react';
import * as styles from './listitem.module.scss';

const ListItem = ({ text, index }) => {
    return (
        <li className={styles.numberedListListItem}>
            <div className={styles.numberedListListNumber}>
                {index + 1}
            </div>
            <div className={styles.numberedListListItemContent} dangerouslySetInnerHTML={{ __html: text }}></div>
        </li>
    )
}

export default ListItem;