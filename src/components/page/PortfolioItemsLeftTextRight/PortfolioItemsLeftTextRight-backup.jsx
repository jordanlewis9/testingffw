import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Rellax from 'rellax';
import PortfolioItem from './PortfolioItem';
import * as styles from './portfolioitemslefttextright.module.scss';

const PortfolioItemsLeftTextRight = ({ content, backgroundImage, topPadding, bottomPadding, portfolioItems }) => {
    const image = backgroundImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const rellaxRef = useRef();
    const [portfolioItemsToUse, setPortfolioItemsToUse] = useState(null);
    const [isRest, setIsRest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await axios.get(`${process.env.GATSBY_ROOT}/wp-json/wp/v2/portfolio?orderby=rand&per_page=5`);
                setPortfolioItemsToUse(items.data);
                setIsRest(true);
            } catch (err) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(err.response.data);
                }
            }
        }

        if (portfolioItemsToUse === null) {
            if (portfolioItems?.length === 5) {
                setPortfolioItemsToUse(portfolioItems);
                setIsRest(false);
            } else {
                fetchData();
            }
        } else {
            new Rellax(rellaxRef.current, {
                speed: 2,
                center: true,
                wrapper: null,
                round: true,
                vertical: true,
                horizontal: false
            });
        }
        
    }, [portfolioItems, portfolioItemsToUse]);

    const renderPortfolioItems = (items) => {
        if (isRest) {
            return items.map(item => (
                <PortfolioItem key={item.link} isRest={isRest} image={item.featured_media} slug={item.link} title={item.title.rendered} />
            ))
        } else {
            return items.map(item => (
                <PortfolioItem key={item.uri} isRest={isRest} image={item.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src} slug={item.uri} title={item.title} />
            ))
        }
    }

    return (
        <div className={`${styles.portfolioText} bg-cover`} style={{ paddingTop: topPadding, paddingBottom: bottomPadding, backgroundImage: image && `url('${image}')`}}>
            <div className="container">
                <div className="row align-items-center">
                    <div className={`col-md-6 ${styles.portfolioTextContentCol}`} dangerouslySetInnerHTML={{ __html: content }} data-aos="fade-in">
                        
                    </div>
                    <div className={`col-md-6 ${styles.portfolioTextPortfolioCol}`} >
                        {portfolioItemsToUse?.length > 0 && <div className={`${styles.portfolioTextPortfolioWrap} rellax`} ref={rellaxRef}>
                            {portfolioItemsToUse?.length > 0 && renderPortfolioItems(portfolioItemsToUse)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioItemsLeftTextRight;