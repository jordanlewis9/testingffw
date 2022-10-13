import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Marquee from 'react-easy-marquee';
import PortfolioItem from './PortfolioItem';
import FormsFactory from '../../../utils/FormsFactory';
import * as styles from './portfolioitemslefttextright.module.scss';

const PortfolioItemsLeftTextRight = ({ content, backgroundImage, addForm }) => {
    const image = backgroundImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const [leftPillar, setLeftPillar] = useState(null);
    const [rightPillar, setRightPillar] = useState(null);

    const data = useStaticQuery(graphql`
    query AllPortfolioQuery {
        allWpPortfolio {
          nodes {
            title
            uri
            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(formats: WEBP, width: 270, height: 324)
                  }
                }
              }
            }
          }
        }
      }
    `);

    useEffect(() => {
        let leftArray = [];
        let rightArray = [];

        for (let i = 0; i < data.allWpPortfolio.nodes.length; i++) {
            if (i === 0) {
                leftArray.push(data.allWpPortfolio.nodes[0]);
            } else if (i % 2 === 1) {
                rightArray.push(data.allWpPortfolio.nodes[i]);
            } else {
                leftArray.push(data.allWpPortfolio.nodes[i]);
            }
        }

        if (leftArray.length > 0) {
            setLeftPillar(leftArray);
        }

        if (rightArray.length > 0) {
            setRightPillar(rightArray);
        }
    }, []);

    const renderPortfolioItems = (items) => {
        return items.map(item => (
            <PortfolioItem key={item.uri} image={item.featuredImage?.node} slug={item.uri} title={item.title} />
        ))
    }

    return (
        <div className={`${styles.portfolioText} bg-cover`} style={{ backgroundImage: image && `url('${image}')`}}>
            <div className="container">
                <div className="row align-items-center">
                    <div className={`col-md-6 ${styles.portfolioTextContentCol}`} data-aos="fade-in">
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                        <FormsFactory form={addForm} />
                    </div>
                    <div className={`col-md-6 ${styles.portfolioTextPortfolioCol}`} >
                            {leftPillar?.length > 0 && <Marquee duration={150000} reverse={true} axis="Y" pauseOnHover={true} height="100%" className={styles.portfolioTextLeftPillar} width="50%">
                                    {renderPortfolioItems(leftPillar)}
                                </Marquee>}
                            {rightPillar?.length > 0 && <Marquee duration={150000} reverse={false} axis="Y" pauseOnHover={true} height="100%" className={styles.portfolioTextRightPillar} width="50%">
                                    {renderPortfolioItems(rightPillar)}
                                </Marquee>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioItemsLeftTextRight;