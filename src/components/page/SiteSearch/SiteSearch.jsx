import React, { useState, useContext, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PagePropsContext } from '../../global/GlobalContext';
import * as styles from './sitesearch.module.scss';

const SiteSearch = ({ paddingTop, paddingBottom }) => {
    const { pageProps } = useContext(PagePropsContext);

    const data = useStaticQuery(graphql`
    query SiteSearchQuery {
        allWpPage {
          nodes {
            title
            uri
            nodeType
          }
        }
        allWpPortfolio {
          nodes {
            title
            uri
            portfolioIndustries {
              nodes {
                name
              }
            }
            nodeType
          }
        }
        allWpPost {
          nodes {
            title
            uri
            nodeType
            pageBlocks {
              content {
                ... on WpPost_Pageblocks_Content_FullWidthText {
                  content
                }
              }
            }
          }
        }
        allWpFaq {
          nodes {
            title
            uri
            content
            nodeType
          }
        }
        allWpPerson {
            nodes {
              title
              uri
              nodeType
              team {
                position
              }
            }
          }
      }      
    `);

    const { allWpFaq, allWpPage, allWpPortfolio, allWpPost, allWpPerson } = data;

    const [searchTerm, setSearchTerm] = useState(pageProps?.location?.search?.replace('?q=', "") || '');
    const [searchResults, setSearchResults] = useState(null);

    const filterSearchResults = () => {
        let results = [];

        if (searchTerm) {
            allWpFaq.nodes.forEach(faq => {
                if (faq.title.toLowerCase().includes(searchTerm.toLowerCase()) || faq.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                    results.push(faq);
                }
            })
            allWpPage.nodes.forEach(page => {
                if (page.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    results.push(page);
                }
            })
            allWpPortfolio.nodes.forEach(portfolio => {
                if (portfolio.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    results.push(portfolio);
                } else if (portfolio.portfolioIndustries.nodes.some(industry => industry.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
                    results.push(portfolio);
                }
            })
            allWpPost.nodes.forEach(post => {
                if (post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    post.nodeType = "Blog Post";
                    results.push(post);
                } else if (post.pageBlocks.content.some(block => block.content.toLowerCase().includes(searchTerm.toLowerCase()))) {
                    post.nodeType = "Blog Post";
                    results.push(post);
                }
            })
            allWpPerson.nodes.forEach(person => {
                if (person.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    person.nodeType = "Team Member";
                    results.push(person);
                } else if (person.team.position.toLowerCase().includes(searchTerm.toLowerCase())) {
                    person.nodeType = "Team Member";
                    results.push(person);
                }
            })
        } else {
            allWpFaq.nodes.forEach(faq => {
                faq.nodeType = "FAQ";
                results.push(faq);
            })
            allWpPage.nodes.forEach(page => {
                results.push(page);
            })
            allWpPortfolio.nodes.forEach(portfolio => {
                results.push(portfolio);
            })
            allWpPost.nodes.forEach(post => {
                post.nodeType = "Blog Post";
                results.push(post);
            })
            allWpPerson.nodes.forEach(person => {
                person.nodeType = "Team Member";
                results.push(person);
            })
        }

        setSearchResults(results);
    }

    useEffect(() => {
        filterSearchResults();
    }, [searchTerm])

    const handleInputChange = (e) => {
        if (e.target.value === "") {
            setSearchTerm("");
        } else {
            setSearchTerm(e.target.value);
        }
    }

    const renderResults = () => {
        if (searchResults.length === 0) {
            return <div>Sorry, we couldn't find anything matching your search term.</div>
        } else {
            return searchResults.map(result => {
                return (
                    <li className={styles.siteSearchResultsListItem} key={result?.uri}>
                        <Link to={result?.uri} title={result?.title || result?.name} className={styles.siteSearchResultsListItemLink}>
                            {result?.title || result?.name}
                        </Link>
                        <div className={styles.siteSearchResultsListType}>{result.nodeType}</div>
                    </li>
                )
            })
        }
    }

    return (
       <div className={styles.siteSearchContainer} style={{ paddingTop, paddingBottom }}>
        <div className={styles.siteSearchContainerInner}>
            <div className={styles.siteSearchContainerUpper}>
                <form action="" className={styles.siteSearchForm} onSubmit={(e) => e.preventDefault()}>
                    <input type="text" className={styles.siteSearchFormInput} onChange={(e) => handleInputChange(e)} value={searchTerm} />
                    <FontAwesomeIcon icon={faSearch} className={styles.siteSearchFormGlass} />
                </form>
                <h3 className={styles.siteSearchHeading}>
                    {searchTerm ? `Results for ${searchTerm}` : "Can't find what you're looking for? We can help!"}
                </h3>
            </div>
            {searchResults && <ul className={styles.siteSearchResultsList}>
                {renderResults()}
            </ul>}
        </div>
       </div>
    )
}

export default SiteSearch;