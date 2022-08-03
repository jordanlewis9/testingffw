const path = require('path')

module.exports = async gatsbyUtilities => {
  const faqs = await getFaqs(gatsbyUtilities)
  await createFaqs(faqs, gatsbyUtilities)
}
const getFaqs = async ({ graphql }) => {
  const graphqlResult = await graphql(`
    query allFaqs {
      allWpFaqCategory {
        nodes {
          id
          uri
          name
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    console.error(graphqlResult.errors)
    throw new Error('GraphQL query failed')
  }
  return graphqlResult.data.allWpFaqCategory.nodes
}

const createFaqs = async (posts, gatsbyUtilities) => {
  return Promise.all(
    posts.map(post => {
      return gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve('./src/templates/faq-taxonomy-archive.js'),
        context: {
          id: post.id,
          title: `${post.name} FAQs`
        },
      })
    })
  )
}