const path = require('path')

module.exports = async gatsbyUtilities => {
  const people = await getPeople(gatsbyUtilities)
  await createPeople(people, gatsbyUtilities)
}
const getPeople = async ({ graphql }) => {
  const graphqlResult = await graphql(`
    query People {
      allWpPerson(sort: { order: DESC, fields: [date] }) {
        nodes {
          id
          uri
          title
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    console.error(graphqlResult.errors)
    throw new Error('GraphQL query failed')
  }
  return graphqlResult.data.allWpPerson.nodes
}

const createPeople = async (posts, gatsbyUtilities) => {
  return Promise.all(
    posts.map(post => {
      return gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve('./src/templates/person.js'),
        context: {
          id: post.id,
          title: `${post.title} | Our Team`
        },
      })
    })
  )
}