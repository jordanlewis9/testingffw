import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import * as styles from './portfolioitem.module.scss';

const PortfolioItem = ({ image, slug, title, isRest }) => {
    const [itemImage, setItemImage] = useState(null);
    const [itemSlug, setItemSlug] = useState(null);

    useEffect(() => {
        setItemImage(image);
        setItemSlug(slug)
    }, [image, slug]);

    return (
        <div className={styles.portfolioTextItem}>
            <Link to={itemSlug} className={`${styles.portfolioitemCompactsimple} bg-cover`} title={title} target="_self" style={{ backgroundImage: itemImage && `url('${itemImage}')`}}>
                <div className={styles.portfolioitemCompactsimpleTitle} dangerouslySetInnerHTML={{ __html: title}}></div>
            </Link> 
        </div>
    )
}

export default PortfolioItem;