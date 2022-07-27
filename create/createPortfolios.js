const path = require('path')

module.exports = async gatsbyUtilities => {
  const portfolios = await getPortfolios(gatsbyUtilities)
  await createPortfolios(portfolios, gatsbyUtilities)
}
const getPortfolios = async ({ graphql }) => {
  const graphqlResult = await graphql(`
    query Portfolio {
      allWpPortfolio(sort: { order: DESC, fields: [date] }) {
        nodes {
          id
          uri
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    console.error(graphqlResult.errors)
    throw new Error('GraphQL query failed')
  }
  return graphqlResult.data.allWpPortfolio.nodes
}

const createPortfolios = async (posts, gatsbyUtilities) => {
  return Promise.all(
    posts.map(post => {
      return gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve('./src/templates/portfolio.js'),
        context: {
          id: post.id,
        },
      })
    })
  )
}