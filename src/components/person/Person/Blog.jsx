import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import * as styles from './blog.module.scss';

const Blog = ({ blog }) => {

    return (
        <div className={`col-md-6 ${styles.authorPagePostCol}`}>
            <Link className="compact-post" to={blog.uri} title={blog.title} target="_self">
                <h4 className="compact-post-title">
                    {blog.title}
                </h4>
                <div className="compact-post-date">
                    {blog.date && blog.date}
                </div>
                <div className="compact-post-arrow"></div>
            </Link>
        </div>
    )
}

export default Blog;