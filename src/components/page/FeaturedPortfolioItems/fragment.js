module.exports = () => {
    return `
    bottomPadding
    heading
    topPadding
    portfolioItems {
        ... on WpPortfolio {
          id
          uri
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(formats: WEBP)
                }
              }
            }
          }
        }
      }
    `;
}