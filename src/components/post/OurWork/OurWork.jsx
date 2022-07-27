import { graphql, useStaticQuery } from 'gatsby';
import React, { useState, useEffect } from 'react';
import OurWorkFilters from './OurWorkFilters';
import SinglePortfolio from './SinglePortfolio';
import * as styles from './ourwork.module.scss';

const OurWork = ({ paddingTop, paddingBottom }) => {
    const [industryList, setIndustryList] = useState([]);

    const data = useStaticQuery(graphql`
        query PostWorkQuery {
            allWpPortfolio {
                nodes {
                  portfolioIndustries {
                    nodes {
                      name
                    }
                  }
                  title
                  uri
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
            allWpPortfolioIndustry {
            nodes {
                count
                name
                }
            }
        }
    `)

    const allItems = data?.allWpPortfolio?.nodes;
    const allIndustries = data?.allWpPortfolioIndustry?.nodes;

    const renderPortfolioItems = () => {
        return allItems.map(item => <SinglePortfolio key={item.title} data={item} industryList={industryList} />)
    }

    const handleCheckmarks = (e) => {
        if (e.target.checked) {
            setIndustryList([...industryList, e.target.value]);
        } else {
            let newIndustryList = industryList.filter(item => item !== e.target.value);
            setIndustryList(newIndustryList);
        }
    }

    return (
        <div className={`${styles.ourWorkPage} facetwp-template`}>
            <div className={`container-fluid ${styles.ourWorkPageContainer}`}>
                <div className={`row ${styles.ourWorkPageRow}`}>
                    <div className={`col-md-4 col-lg-3 ${styles.ourWorkPageCol}`}>
                        <OurWorkFilters handleCheckmarks={handleCheckmarks} allIndustries={allIndustries} />
                    </div>
                    {allItems && renderPortfolioItems()}
                </div>
            </div>
        </div>
    )
}

export default OurWork;