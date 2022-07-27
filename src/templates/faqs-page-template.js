// See .cache/page-templates after running dev/build
// to understand how this file ends up looking

import React, { useEffect } from 'react'
import { graphql } from 'gatsby';
import 'aos/dist/aos.css';
import GlobalContainer from '../components/global/GlobalContainer';
import PageHeader from '../components/faqs/PageHeader';
import CTA from '../components/faqs/CTA';
import FAQs from '../components/faqs/FAQs';
// import './pageTemplate.module.scss';

// ### COMPONENT IMPORTS ### DO NOT MODIFY OR MOVE THIS COMMENT ###

const PageTemplate = pageProps => {
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
  const { ctaContent, ctaLink } = pageProps?.data?.wpPage?.template?.faqsPage;
  return (
    <GlobalContainer pageProps={pageProps}>
        <PageHeader pageHeader={pageProps?.data?.wpPage?.pageHeader?.headerCustomHeading} />
        <div className='faqs-page'>
          <div className="container">
            <div className="row">
              <FAQs content={ctaContent} link={ctaLink} />
            </div>
          </div>
        </div>
    </GlobalContainer>
  )
}

export default PageTemplate

export const query = graphql `
    query Faq($id: String!) {
        wpPage(id: {eq: $id}) {
          seo {
            metaDescription
            title
          }
            template {
              ... on WpFAQsPageTemplate {
                templateName
                faqsPage {
                  ctaContent
                  ctaLink {
                    target
                    title
                    url
                  }
                }
              }
            }
        }
    }
`