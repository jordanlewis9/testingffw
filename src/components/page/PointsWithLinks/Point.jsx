import React from 'react';
import { Link } from 'gatsby';
import * as styles from './point.module.scss';

const Point = ({ point }) => {
    const { text, link } = point;

    return (
        <li className={styles.pointsLinksPoint}>
            <div className={styles.pointsLinksPointContent} dangerouslySetInnerHTML={{ __html: text }}></div>
            {link && 
            <Link to={link.url} target={link.target} title={link.title} className={`forefrontweb-button ${styles.pointsLinksButton}`}>
                <span>
                    {link.title}
                </span>
            </Link>
            }
        </li>
    )
}

export default Point;