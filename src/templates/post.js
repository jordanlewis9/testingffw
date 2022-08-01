import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { combineFields } from '../utils/combine-fields'
import GlobalContainer from '../components/global/GlobalContainer'
import BlogPageHeader from '../components/post/BlogPageHeader'
import Content from '../components/global/Content';


const NewsTemplate = pageProps => {
  let AOS;
  useEffect(() => {
    /**
     * Server-side rendering does not provide the 'document' object
     * therefore this import is required either in useEffect or componentDidMount as they
     * are exclusively executed on a client
     */
    const AOS = require("aos");
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (AOS) {
      AOS.refresh();
    }
  });
  const data = combineFields(pageProps.data.wpPost, 'post')

  return (
    <GlobalContainer props={pageProps} queryName="wpPost">
      <BlogPageHeader />
      <Content {...data} />
    </GlobalContainer>
  )
}

export default NewsTemplate

export const query = graphql`
  query PostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      seo {
        metaDescription
        title
      }
      title
      date(formatString: "MM.DD.YYYY")
      content
      postAuthor {
        postAuthor {
            ... on WpPerson {
                uri
                title
                team {
                    funFact
                    shortBio
                    headshot {
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
      categories {
        nodes {
          databaseId
          name
        }
      }
    }
  }
`