import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import * as styles from './logo.module.scss';

const Logo = ({ item, isRest }) => {
    const image = item?.portfolioItem?.logo?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const [itemLogo, setItemLogo] = useState(null);
    const [hasLogo, setHasLogo] = useState(false);
    const [itemLink, setItemLink] = useState(null);
    const [itemTitle, setItemTitle] = useState(null);

    useEffect(() => {
        if (image) {
            setItemLogo(image);
            setHasLogo(true);
        }

        if (item?.uri) {
            setItemLink(item?.uri);
        }

        if (item?.title) {
            setItemTitle(item?.title);
        }
    }, [item]);

    const renderLogo = () => {
        return (
            <div className={styles.categoryPortfolioItemsLogoWrap}>
                {itemLink && <Link to={itemLink} className={styles.categoryPortfolioItemsLogoLink} target="_self" title={itemTitle}>
                    <img src={itemLogo} alt={`${itemTitle} logo`} className={styles.categoryPortfolioItemsLogo} />
                </Link>}
                {!itemLink && <img src={itemLogo} alt={`${itemTitle} logo`} className={styles.categoryPortfolioItemsLogo} />}
            </div>
        )
    }

    return (
        <>
            {hasLogo && renderLogo()}
        </>
    )
}

export default Logo;