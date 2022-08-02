module.exports = async gatsbyUtilities => {
    const redirects = await getRedirects(gatsbyUtilities);
    return redirects;
  }

  const getRedirects = async ({ graphql }) => {
    const graphqlResult = await graphql(`
      query Redirect {
        allWpRedirect {
            nodes {
              redirectOptions {
                fromAddress
                toAddress
              }
            }
          }
      }
    `)
    if (graphqlResult.errors) {
      console.error(graphqlResult.errors)
      throw new Error('GraphQL query failed')
    }
    return graphqlResult.data.allWpRedirect.nodes
  }