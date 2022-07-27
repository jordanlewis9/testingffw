import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SingleBlog from './SingleBlog';
import { PagePropsContext } from '../../global/GlobalContext';
import * as styles from './blog.module.scss';

const Blog = ({ animation, paddingTop, paddingBottom }) => {
    const { pageProps } = useContext(PagePropsContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    console.log(pageProps);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (pageProps.location.search) {
                    const searchCat = pageProps.location.search.replace('?category=', '');
                    response = await axios.get(`${process.env.GATSBY_ROOT}/wp-json/wp/v2/posts?page=${currentPage}&categories=${searchCat}`);
                } else {
                    response = await axios.get(`${process.env.GATSBY_ROOT}/wp-json/wp/v2/posts?page=${currentPage}`);
                }
                setBlogs(response.data);
                setTotalPages(response.headers['x-wp-totalpages']);
            } catch (err) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(err.response.data);
                }
            }
        };

        fetchData();
    }, [currentPage])

    const renderBlogs = () => {
        return blogs.map(blog => <SingleBlog blog={blog} animation={animation} key={blog.id} />)
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

    return (
        <div className={styles.postsArchive} style={{ paddingTop, paddingBottom }}>
            <div className="container">
                <div className="row">
                    {blogs && renderBlogs()}
                </div>
                <div className="nav-links">
                    <button className={`nav-links-button ${currentPage < 2 && 'hide-nav-button'}`} data-page="previous" onClick={(e) => renderNextPage(e)}>
                        Newer Posts
                    </button>
                    <button className={`nav-links-button ${currentPage > (totalPages - 1) && 'hide-nav-button'}`} data-page="next" onClick={(e) => renderNextPage(e)}>
                        Older Posts
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Blog;