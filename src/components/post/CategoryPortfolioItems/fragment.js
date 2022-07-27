module.exports = () => {
    return `
    bottomPadding
            heading
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
                portfolioItem {
                  logo {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(formats: WEBP)
                      }
                    }
                  }
                }
              }
            }
            topPadding
            link {
              target
              title
              url
            }
            portfolioIndustry {
              name
              uri
              databaseId
            }
    `
}