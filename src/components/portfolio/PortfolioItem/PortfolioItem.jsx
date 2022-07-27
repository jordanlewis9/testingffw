import React from 'react';
import * as styles from './portfolioitem.module.scss';

const PortfolioItem = ({ portfolioItem, featuredImage, title }) => {
    const { description, logo, websiteLink } = portfolioItem;
    const photo = featuredImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    const renderWebsiteLink = () => {
        let backgroundPhoto;

        if (photo) {
            backgroundPhoto = <div style={{ backgroundImage: `url('${photo}')`}} className={`${styles.portfolioItemSingleLookImage} bg-cover`}>
                <div className={styles.portfolioItemSingleLookTriangle}></div>
                {logo && <div className={`${styles.portfolioItemSingleLookLogo} bg-contain`} style={{ backgroundImage: `url('${logo.sourceUrl}')`}}></div>}
            </div>
        } else {
            backgroundPhoto = <div className={`${styles.portfolioItemSingleLookImage} bg-cover`}>
                <div className={styles.portfolioItemSingleLookTriangle}></div>
                {logo && <div className={`${styles.portfolioItemSingleLookLogo} bg-contain`} style={{ backgroundImage: `url('${logo.sourceUrl}')`}}></div>}
            </div>
        }

        return (
            <a href={websiteLink.url} target="_blank" title={websiteLink.title} className={styles.portfolioItemSingleLook}>
                {backgroundPhoto}
                <div className={styles.portfolioItemSingleLookTextWrap}>
                    <div className={`${styles.portfolioItemSingleLookText} h3`}>
                        {websiteLink.title}
                    </div>
                    <div className={styles.portfolioItemSingleLookArrow}></div>
                </div>
            </a>
        )
    }
    return (
        <div className={styles.portfolioItemSingle}>
            <div className="container">
                <div className="row align-items-center">
                    <div className={`col-md-6 ${styles.portfolioItemsSingleContentCol}`}>
                        <h1 className={styles.portfolioItemSingleTitle}>
                            {title}
                        </h1>
                        <span dangerouslySetInnerHTML={{ __html: description }}></span>
                    </div>
                    <div className={`col-md-6 ${styles.portfolioItemSingleLookCol}`}>
                        {websiteLink && renderWebsiteLink()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioItem;