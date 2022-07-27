import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { combineFields } from '../utils/combine-fields'
import GlobalContainer from '../components/global/GlobalContainer'
import FaqTaxArchiveHeader from '../components/faqTaxonomyArchive/FaqTaxArchiveHeader';
import FaqArchive from '../components/faqTaxonomyArchive/FaqArchive';

const FaqTaxonomyArchiveTemplate = pageProps => {
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
  const data = combineFields(pageProps.data.wpFaqCategory, 'faqCategory');

  return (
    <GlobalContainer props={pageProps} queryName="wpFaqCategory">
        <FaqTaxArchiveHeader category={data.name} />
        <FaqArchive faqs={data.faqs.nodes} />
    </GlobalContainer>
  )
}

export default FaqTaxonomyArchiveTemplate;

export const query = graphql`
query AllFaqQuery($id: String!) {
    wpFaqCategory(id: {eq: $id}) {
        seo {
          metaDescription
          title
        }
        name
        faqs {
          nodes {
            content
            title
          }
        }
    }
  }
`