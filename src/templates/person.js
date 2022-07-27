import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { combineFields } from '../utils/combine-fields'
import GlobalContainer from '../components/global/GlobalContainer'
import PersonPageHeader from '../components/person/PersonPageHeader';
import Person from '../components/person/Person';

const PersonTemplate = pageProps => {
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
  const data = combineFields(pageProps.data.wpPerson, 'person');

  return (
    <GlobalContainer props={pageProps} queryName="wpPerson">
        <PersonPageHeader />
        <Person person={data} />
    </GlobalContainer>
  )
}

export default PersonTemplate;

export const query = graphql`
query PersonQuery($id: String!) {
    wpPerson(id: {eq: $id}) {
      seo {
        metaDescription
        title
      }
        title
        databaseId
        uri
        team {
          bio
          funFact
          position
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
`