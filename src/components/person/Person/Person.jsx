import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Blog from './Blog';
import * as styles from './person.module.scss';

const Person = ({ person }) => {
    const data = useStaticQuery(graphql`
    query AllPeopleBlogsQuery {
        allWpPost(sort: {fields: date, order: DESC}) {
            nodes {
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
              date(formatString: "MM.DD.YYYY")
              postAuthor {
                postAuthor {
                  ... on WpPerson {
                    id
                    databaseId
                  }
                }
              }
            }
          }
    }
    `);

    const allWpPost = data.allWpPost.nodes;

    const [blogs, setBlogs] = useState(null);
    const image = person.team?.headshot?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    useEffect(() => {
        const filteredBlogs = allWpPost.filter(blog => parseFloat(blog.postAuthor.postAuthor.databaseId) === parseFloat(person.databaseId));
        setBlogs(filteredBlogs);
    }, [])

    const renderFunFact = () => {
        return (
            <div className={styles.authorPageFunFact}>
                <h3 className={styles.authorPageFactTitle}>Fun Fact:</h3>
                <div className={styles.authorPageFact}>
                    {person.team.funFact}
                </div>
            </div>
        )
    }

    const renderBlogs = () => {
        return (
            <div className={styles.authorPagePosts}>
                <div className="container container-no-padding">
                    <div className="row">
                        <div className={`col-md-4 ${styles.authorPagePostsTitleCol}`}>
                            <div className={`${styles.authorPagePostsTitleBox} text-white`}>
                                <h3 className={styles.authorPagePostsTitle}>Atricles Written By {person.title.split(' ')[0]}</h3>
                                <div className="triangles-shortcode"></div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-8 ${styles.authorPagePostsCol}`}>
                        <div className="row">
                            {blogs.map(blog => <Blog key={blog.title} blog={blog} />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.authorPage}>
            <div className="container">
                <div className="row">
                    <div className={`col-md-6 ${styles.authorPagePhotoCol}`} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.authorPagePhotoWrap}>
                            <div className={`${styles.authorPagePhoto} bg-cover`} style={{ backgroundImage: image && `url('${image}')` }}></div>
                            {person?.team?.funFact && renderFunFact()}
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles.authorPageBioCol}`} data-aos="fade-up">
                        <h2 className={styles.authorPageName}>{person.title.split(' ')[0]}</h2>
                        {person.team.position && <h4 className={styles.authorPagePosition}>{person.team.position}</h4>}
                        <div className="triangles-shortcode"></div>
                        <span dangerouslySetInnerHTML={{ __html: person.team.bio}}></span>
                    </div>
                </div>
            </div>
            {blogs?.length > 0 && renderBlogs()}
        </div>
    )
}

export default Person;