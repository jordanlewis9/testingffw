require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl = process.env.URL;

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        auth: {
          htaccess: {
            username: process.env.HTTPBASICAUTH_USERNAME,
            password: process.env.HTTPBASICAUTH_PASSWORD,
          }
        }
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode {
            nodes {
              ... on WpPage {
                uri
                modifiedGmt
              }
              ... on WpPortfolio {
                uri
                modifiedGmt
              }
              ... on WpPost {
                id
                modifiedGmt
                uri
              }
              ... on WpPerson {
                modifiedGmt
                uri
              }
            }
          }
        }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: {nodes: allWpNodes}
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node;
            acc[uri] = node;

            return acc;
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt
          }
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@import "${__dirname}/src/styles/abstracts";`
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: process.env.WPGRAPHQL_URL
      }
    },
    'gatsby-plugin-minify-html'
  ],
}
