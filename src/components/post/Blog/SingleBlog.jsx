import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import * as styles from './singleblog.module.scss';

const SingleBlog = ({ blog, animation }) => {
    const image = blog?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    return (
        <div className={`${styles.postsArchiveCompactWrap}`} data-aos={animation && animation}>
            <Link to={blog?.uri} title={blog?.title} className={`${styles.compactPost} ${styles.compactPostImageLink}`}>
                <div className={`${styles.compactPostImage} bg-cover`} style={{ backgroundImage: image && `url('${image}')` }}></div>
                <div className={styles.compactPostInner}>
                    <h4 className={styles.compactPostTitle} dangerouslySetInnerHTML={{ __html: blog?.title }}></h4>
                    <div className={styles.compactPostDate}>{blog?.date && blog.date}</div>
                    <div className={styles.compactPostArrow}></div>
                </div>
            </Link>
        </div>
    )
}

export default SingleBlog;