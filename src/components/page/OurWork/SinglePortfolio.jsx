import React from 'react';
import { Link } from 'gatsby';
import * as styles from './singleportfolio.module.scss';

const SinglePortfolio = ({ data, industryList }) => {
    let removeItem;
    const featuredImage = data.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const logo = data.portfolioItem?.logo?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    if (industryList.length === 0 || data.portfolioIndustries.nodes.some(node => industryList.includes(node.name))) {
        removeItem = '';
    } else {
        removeItem = styles.removeItem;
    }

    return (
        <div className={`col-md-4 col-lg-3 ${styles.ourWorkPageCol} ${removeItem}`}>
            <Link to={data.uri} className={styles.portfolioItemCompact}>
                {featuredImage && <div className={`${styles.portfolioItemCompactImage} bg-cover`} style={{ backgroundImage: `url('${featuredImage}')`}}></div>}
                <span className="screen-reader-text">{data.title}</span>
                <div className={styles.portfolioItemCompactTriangle}></div>
                {logo && <div className={`${styles.portfolioItemCompactLogo} bg-contain`} style={{ backgroundImage: `url('${logo}')`}}></div>}
            </Link>
        </div>
    )
}

export default SinglePortfolio;