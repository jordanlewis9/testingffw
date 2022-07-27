import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import * as styles from './portfolioitem.module.scss';

const PortfolioItem = ({ image, title, slug }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        setImageUrl(image);
    }, [])

    return (
        <Link to={slug} className={`${styles.portfolioItemCompactSimple} bg-cover`} title={title} target="_self" style={{ backgroundImage: imageUrl && `url('${imageUrl}')`}}>
            <div className={styles.portfolioItemCompactSimpleTitle} dangerouslySetInnerHTML={{ __html: title }}></div>
        </Link>
    )
}

export default PortfolioItem;