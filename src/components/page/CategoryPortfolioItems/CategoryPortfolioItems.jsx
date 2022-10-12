import React, { useState, useEffect, useRef } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Marquee from 'react-easy-marquee';
import Logo from './Logo';
import CategoryItem from './CategoryItem';
import * as styles from './categoryportfolioitems.module.scss';

const CategoryPortfolioItems = ({ heading, topPadding, bottomPadding, portfolioItems, link, portfolioIndustry }) => {
    const [categoryItems, setCategoryItems] = useState(null);
    const [isRest, setIsRest] = useState(null);

    const data = useStaticQuery(graphql`
    query CategoryItemQuery {
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
            setCategoryItems(filteredData.portfolios.nodes);
        } else {
            setCategoryItems(portfolioItems);
        }
    }, [portfolioItems, portfolioIndustry]);

    const renderLogos = () => {
        return categoryItems.map((item, index) => <Logo item={item} key={index} />)
    }

    const renderItems = () => {
        return categoryItems.map((item, index) => <CategoryItem item={item} key={index} index={index} />)
    }

    return (
        <section className={styles.categoryPortfolioItems} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={`container-fluid ${styles.categoryPortfolioItemsTop}`}>
                <div className="row">
                    <div className="col-md-6 d-none d-lg-block d-xl-block">
                        <Marquee className={styles.categoryPortfolioItemsMarquee} duration={40000} reverse={true} axis="X" pauseOnHover={true}>
                            <div className={styles.categoryPortfolioItemsLogos}>
                                {(categoryItems && categoryItems.length > 0) && renderLogos()}
                            </div>
                        </Marquee>
                    </div>
                    <div className="col-md">
                        {heading && <h3 className={styles.categoryPortfolioItemsHeading}>{heading}</h3>}
                    </div>
                </div>
            </div>
            <div className={styles.categoryPortfolioItemsItemsWrap}>
                {(categoryItems && categoryItems.length > 0) && renderItems()}
            </div>
            {link && <Link to={link.url} title={link.title} className={styles.categoryPortfolioItemsLink} target={link.target}>{link.title}</Link>}
        </section>
    )
}

export default CategoryPortfolioItems;