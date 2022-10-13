import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './portfolioitem.module.scss';

const PortfolioItem = ({ image, slug, title, isRest }) => {
    // const [itemImage, setItemImage] = useState(null);
    const [itemSlug, setItemSlug] = useState(null);

    const gatsbyImage = getImage(image?.localFile);

    useEffect(() => {
        // setItemImage(image);
        setItemSlug(slug)
    }, [slug]);

    return (
        <div className={styles.portfolioTextItem}>
            <Link to={itemSlug} className={`${styles.portfolioitemCompactsimple} bg-cover`} title={title} target="_self">
                <GatsbyImage image={gatsbyImage} className={styles.portfolioitemCompactsimpleImage} alt={image?.altText}>
                </GatsbyImage>
                <div className={styles.portfolioitemCompactsimpleTitle} dangerouslySetInnerHTML={{ __html: title}}></div>
            </Link> 
        </div>
    )
}

export default PortfolioItem;