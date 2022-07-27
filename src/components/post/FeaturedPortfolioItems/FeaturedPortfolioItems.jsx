import React, { useEffect, useState } from 'react';
import PortfolioItem from './PortfolioItem';
import * as styles from './featuredportfolioitems.module.scss';

const FeaturedPortfolioItem = ({ bottomPadding, heading, topPadding, portfolioItems }) => {
    const [portfolioItemsToUse, setPortfolioItemsToUse] = useState(null);

    useEffect(() => {
        setPortfolioItemsToUse(portfolioItems);
    }, [portfolioItems]);

    const renderPortfolioItems = () => {
        return portfolioItemsToUse.map((item, index) => {
            return (
                <div key={item.uri} className={styles.featuredPortfolioItemsItem} data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                    <PortfolioItem image={item.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src} title={item.title} slug={item.uri} />
                </div>
            )
        })
    }
    
    return (
        <section className={styles.featuredPortfolioItems} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={styles.featuredPortfolioItemsHeadingBox}>
                {heading && <h3 className={styles.featuredPortfolioItemsHeading}>{heading}</h3>}
                <div className={styles.featuredPortfolioItemsArrow}></div>
            </div>
            <div className={styles.featuredPortfolioItemsItemsWrap}>
                {portfolioItemsToUse?.length > 0 && renderPortfolioItems()}
            </div>
        </section>
    )
}

export default FeaturedPortfolioItem;