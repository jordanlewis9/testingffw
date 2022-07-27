import React from "react";
import { Link } from "gatsby";
import * as styles from './blogauthorbox.module.scss';

const BlogAuthorBox = ({ categories, postAuthor }) => {
    const photo = postAuthor?.postAuthor?.team?.headshot?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const name = postAuthor?.postAuthor?.title;

    const renderCategories = () => {
        return categories.nodes.map(cat => {
            return (
                <li key={cat.databaseId} className={styles.singlePostCategory}>
                    <Link to={`/blog?category=${cat.databaseId}`}>
                        {cat.name}
                    </Link>
                </li>
            )
        })
    }

    return (
        <div className={styles.singlePostAuthorBox}>
            <Link to={postAuthor?.postAuthor?.uri && postAuthor.postAuthor.uri} className={`${styles.singlePostAuthorBoxSection} ${styles.singlePostAuthorBoxSectionLink}`}>
                {photo && <div style={{ backgroundImage: `url('${photo}')`}} className={`${styles.singlePostHeadshot} bg-cover`} />}
                {!photo && <div className={`${styles.singlePostHeadshot} bg-cover`}></div>}
                <div className={styles.singlePostName}>By {name}</div>
                {postAuthor?.postAuthor?.team?.shortBio && <div className={styles.singlePostBio} dangerouslySetInnerHTML={{ __html: postAuthor?.postAuthor?.team?.shortBio }}></div>}
            </Link>
            {categories && 
            <div className={styles.singlePostAuthorBoxSection}>
                <div className={styles.singlePostCategoriesLabel}>
                    Related Topics
                </div>
                <ul className={styles.singlePostCategories}>
                    {renderCategories()}
                </ul>
            </div>
            }
        </div>
    )
}

export default BlogAuthorBox;