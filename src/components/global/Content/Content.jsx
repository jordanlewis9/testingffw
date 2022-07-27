import React from 'react';
import { Link } from 'gatsby';
import * as styles from './content.module.scss';

const Content = (props) => {
    const { author, categories, content, date, title } = props;
    const { name } = author.node;
    const { headshot, shortBio, teamMember } = author.node.extraInfo;
    const photo = headshot?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

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
        <div className="single-wrap">
            <div className="container container-medium single-container">
                <article>
                    <header className={styles.singlePostHeader}>
                        <h1 className={styles.singlePostTitle}>
                            {title}
                        </h1>
                        <div className={styles.singlePostMeta}>
                            {date}
                        </div>
                    </header>
                    <div className={styles.singlePostContent} dangerouslySetInnerHTML={{ __html: content }}></div>
                    <div className={styles.singlePostAuthorBox}>
                        <Link to={teamMember?.uri && teamMember.uri} className={`${styles.singlePostAuthorBoxSection} ${styles.singlePostAuthorBoxSectionLink}`}>
                            {photo && <div style={{ backgroundImage: `url('${photo}')`}} className={`${styles.singlePostHeadshot} bg-cover`} />}
                            {!photo && <div className={`${styles.singlePostHeadshot} bg-cover`}></div>}
                            <div className={styles.singlePostName}>By {name}</div>
                            {shortBio && <div className={styles.singlePostBio} dangerouslySetInnerHTML={{ __html: shortBio }}></div>}
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
                    <Link to="/blog" className={styles.singlePostBack}>
                        Back to Blog
                    </Link>
                </article>
            </div>
        </div>
    )
}

export default Content;