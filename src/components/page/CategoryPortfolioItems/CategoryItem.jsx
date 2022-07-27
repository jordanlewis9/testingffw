import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import * as styles from './categoryitem.module.scss';

const CategoryItem = ({ item, isRest, index }) => {
    const featuredImage = item?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const logoImage = item?.portfolioItem?.logo?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    const [itemImage, setItemImage] = useState(null);
    const [itemLogo, setItemLogo] = useState(null);
    const [itemLink, setItemLink] = useState(null);

    useEffect(() => {
        if (featuredImage) {
            setItemImage(featuredImage);
        }

        if (logoImage) {
            setItemLogo(logoImage);
        }

        if (item?.uri) {
            setItemLink(item?.uri);
        }
    }, [item]);

    return (
        <div className={styles.categoryPortfolioItemsItem} data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
            {itemLink && <Link to={itemLink} className={styles.portfolioItemCompact}>
                {itemImage && <div className={`${styles.portfolioItemCompactImage} bg-cover`} style={{ backgroundImage: `url('${itemImage}')` }}></div>}
                <span className='screen-reader-text'>{item.title.rendered}</span>
                <div className={styles.portfolioItemCompactTriangle}></div>
                {itemLogo && <div className={`${styles.portfolioItemCompactLogo} bg-contain`} style={{ backgroundImage: `url('${itemLogo}')`}}></div>}
            </Link>}
        </div>
    )
}

export default CategoryItem;