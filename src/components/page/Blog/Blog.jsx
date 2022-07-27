import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SingleBlog from './SingleBlog';
import { PagePropsContext } from '../../global/GlobalContext';
import BlogFilters from './BlogFilters';
import * as styles from './blog.module.scss';

const Blog = ({ animation, paddingTop, paddingBottom }) => {
    const data = useStaticQuery(graphql`
    query AllBlogsQuery {
        allWpPost(sort: {fields: date, order: DESC}) {
          nodes {
            title
            uri
            date(formatString: "MM.DD.YYYY")
            categories {
              nodes {
                databaseId
              }
            }
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    gatsbyImageData(formats: WEBP)
                  }
                }
              }
            }
          }
        }
        allWpCategory {
            nodes {
              databaseId
              name
              count
            }
          }
      }
    `);
    
    const allWpPost = data.allWpPost.nodes;
    const allWpCategory = data.allWpCategory.nodes;
    const { pageProps } = useContext(PagePropsContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [blogs, setBlogs] = useState(null);
    const [currentBlogs, setCurrentBlogs] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {

        const getTotalPages = (blogsArray) => {
            const tenPerPage = blogsArray.length / 10;
            const leftovers = blogsArray.length % 10;

            if (leftovers > 0) {
                setTotalPages(tenPerPage + 1);
            } else if (leftovers === 0) {
                setTotalPages(tenPerPage);
            }
        }

        if (!blogs) {
            setBlogs(allWpPost);
            
            // if landed on from clicking a related blog category

            if (pageProps.location.search) {
                const searchCat = pageProps.location.search.replace('?category=', '');
                setFilteredCategories([searchCat]);
                let filteredBlogsArray = [];
                allWpPost.forEach(post => {
                    if (post.categories.nodes.some(category => category.databaseId === parseFloat(searchCat))) {
                        filteredBlogsArray.push(post);
                    }
                });
                getTotalPages(filteredBlogsArray);
                setCurrentBlogs(filteredBlogsArray.slice(0, 10));
            } else {
                getTotalPages(allWpPost);
                setCurrentBlogs(allWpPost.slice(0, 10));
            }
        } else {
            if (filteredCategories.length > 0) {
                let filteredBlogsArray = [];

                // go through all of the blogs, loop through all of each blogs categories. For each category, loop through 
                // all of the filtered categories and compare ID's. As soon as a match pops up, that iteration of the loop
                // ends and pushes that post to a holder array

                blogs.forEach(post => {
                    if (post.categories.nodes.some(category => {
                        return filteredCategories.some(filteredCategory => parseFloat(filteredCategory) === parseFloat(category.databaseId))
                    })) {
                        filteredBlogsArray.push(post);
                    }
                });
                setCurrentBlogs(filteredBlogsArray.slice((currentPage * 10 - 10), (currentPage * 10)));
            } else {
                setCurrentBlogs(blogs.slice((currentPage * 10 - 10), (currentPage * 10)));
            }
        }

    }, [currentPage, filteredCategories])

    const renderBlogs = () => {
        return currentBlogs.map(blog => <SingleBlog blog={blog} animation={animation} key={blog.uri} />);
    }

    const renderNextPage = (e) => {
        if (e.target.dataset.page === "previous") {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(currentPage + 1);
        }

        e.target.blur();

        if (typeof window !== "undefined") {
            window.scroll(0, 0);
        }
    }

    const handleCheckmarks = (e) => {
        if (e.target.checked) {
            setFilteredCategories([...filteredCategories, e.target.value]);
        } else {
            let newFilteredCategories = filteredCategories.filter(item => item !== e.target.value);
            setFilteredCategories(newFilteredCategories);
        }
    }

    return (
        <div className={styles.postsArchive} style={{ paddingTop, paddingBottom }}>
            <div className={`container ${styles.postsArchiveContainer}`}>
                <div className={styles.blogContainer}>
                    <BlogFilters categories={allWpCategory} filteredCategories={filteredCategories} handleCheckmarks={handleCheckmarks} />
                    {blogs && renderBlogs()}
                </div>
                <div className="nav-links">
                    <button className={`nav-links-button nav-links-button-previous ${currentPage < 2 && 'hide-nav-button'}`} data-page="previous" onClick={(e) => renderNextPage(e)}>
                        Newer Posts
                    </button>
                    <button className={`nav-links-button nav-links-button-next ${currentPage > (totalPages - 1) && 'hide-nav-button'}`} data-page="next" onClick={(e) => renderNextPage(e)}>
                        Older Posts
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Blog;