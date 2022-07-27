import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { combineFields } from '../utils/combine-fields'
import GlobalContainer from '../components/global/GlobalContainer'
import PortfolioPageHeader from '../components/portfolio/PortfolioPageHeader'
import PortfolioItem from '../components/portfolio/PortfolioItem'
import ComputerScreenshot from '../components/portfolio/ComputerScreenshot'
import Statistics from '../components/portfolio/Statistics';
import RelatedPortfolioItems from '../components/portfolio/RelatedPortfolioItems';
import FullWidthText from '../components/portfolio/FullWidthText';

const PortfolioTemplate = pageProps => {
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
  const data = combineFields(pageProps.data.wpPortfolio, 'portfolio');

  const getPageBlockProps = (pageBlock) => {
      const thisProps = data?.pageBlocks?.content?.find(block => block.fieldGroupName.includes(pageBlock));
      return thisProps;
  }

  let computerScreenshot = getPageBlockProps('ComputerScreenshot');
  let statistics = getPageBlockProps('Statistics');
  let fullWidthText = getPageBlockProps('FullWidthText');
  let relatedPortfolios = getPageBlockProps('RelatedPortfolioItems');

  return (
    <GlobalContainer props={pageProps} queryName="wpPortfolio">
      <PortfolioPageHeader title={data.terms.nodes[0].name} />
      <PortfolioItem portfolioItem={data.portfolioItem} featuredImage={data.featuredImage.node} title={data.title} />
      {computerScreenshot && <ComputerScreenshot computerScreenshot={computerScreenshot} />}
      {statistics && <Statistics statistics={statistics} />}
      {relatedPortfolios && <RelatedPortfolioItems relatedPortfolios={relatedPortfolios} />}
      {fullWidthText && <FullWidthText fullWidthText={fullWidthText} />}
    </GlobalContainer>
  )
}

export default PortfolioTemplate;

export const query = graphql`
  query PortfolioQuery($id: String!) {
    wpPortfolio(id: { eq: $id }) {
        title
        seo {
          metaDescription
          title
        }
        terms {
          nodes {
            databaseId
            name
            uri
            termTaxonomyId
            termGroupId
            isContentNode
            id
            description
            count
            ... on WpPortfolioIndustry {
              id
              name
            }
          }
        }
        portfolioItem {
          websiteLink {
            target
            title
            url
          }
          description
          logo {
            sourceUrl
          }
        }
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        pageBlocks {
          content {
            ... on WpPortfolio_Pageblocks_Content_ComputerScreenshot {
                bottomPadding
                fieldGroupName
                heading
                topPadding
                screenshot {
                  sourceUrl
                }
            }
            ... on WpPortfolio_Pageblocks_Content_Statistics {
              bottomPadding
              heading
              preheading
              topPadding
              statistics {
                content
                label
                statistic
                subheading
                image {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
              fieldGroupName
            }
            ... on WpPortfolio_Pageblocks_Content_RelatedPortfolioItems {
              bottomPadding
              portfolioIndustry {
                name
                databaseId
              }
              topPadding
              heading
              fieldGroupName
              portfolioItems {
                ... on WpPortfolio {
                  id
                  databaseId
                  title
                  uri
                  portfolioItem {
                    logo {
                      sourceUrl
                    }
                  }
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                }
              }
            }
            ... on WpPortfolio_Pageblocks_Content_FullWidthText {
              animation
              backgroundColor
              bottomPadding
              content
              contentWidth
              topPadding
              fieldGroupName
            }
          }
          fieldGroupName
        }
        content
    }
  }
`