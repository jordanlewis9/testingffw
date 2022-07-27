import React, { useEffect, useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import PortfolioItem from './PortfolioItem';
import * as styles from './relatedportfolioitems.module.scss';

const RelatedPortfolioItems = ({ relatedPortfolios }) => {
    const { bottomPadding, heading, portfolioIndustry, portfolioItems, topPadding } = relatedPortfolios;
    const [relatedItems, setRelatedItems] = useState(null);

    const data = useStaticQuery(graphql`
    query RelatedItemQuery {
        allWpPortfolioIndustry {
          nodes {
            name
            portfolios {
              nodes {
                uri
                title
                featuredImage {
                  node {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(formats: WEBP)
                      }
                    }
                  }
                }
                portfolioItem {
                  logo {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(formats: WEBP)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    useEffect(() => {
        if (!portfolioItems && portfolioIndustry) {
            const filteredData = data.allWpPortfolioIndustry.nodes.find(industry => industry.name === portfolioIndustry.name);
            setRelatedItems(filteredData.portfolios.nodes.slice(0, 4));
        } else {
            setRelatedItems(portfolioItems);
        }
    }, [])

    const renderPortfolioItems = () => {
        return relatedItems.map((item, index) => {
            return (
                    <PortfolioItem key={index} item={item} index={index} />
            )
        })
    }

    return (
        <section className={styles.relatedPortfolioItems} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            {heading && 
            <h3 className={styles.relatedPortfolioItemsHeading}>
                {heading}
            </h3>
            }
            <div className={styles.relatedPortfolioItemsItemsWrap}>
                {relatedItems && renderPortfolioItems()}
            </div>
            <Link to="/our-work" className={styles.relatedPortfolioItemsLink} title="Our Work">
                Back to Our Work
            </Link>
        </section>
    )
}

export default RelatedPortfolioItems;