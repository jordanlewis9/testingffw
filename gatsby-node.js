/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 * Based on: https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/gatsby-node.js
 */

require("dotenv").config({
  path: `env.${process.env.NODE_ENV}`
})
const { makeOptions, createPosts } = require('./create/createPosts')
const { setOptions, createPages } = require('./create/createPages')
// const createPosts = require('./create/createPosts');
const createPortfolios = require('./create/createPortfolios');
const createPeople = require('./create/createPeople');
const createFaqs = require('./create/createFaqTaxArchive');

setOptions({
  postTypes: ['Page'],
  graphQLFieldGroupName: 'pageBlocks',
  graphQLFieldName: 'content',
})

makeOptions({
  postTypes: ['Post'],
  graphQLFieldGroupName: 'pageBlocks',
  graphQLFieldName: 'content'
})

module.exports.createPages = async gatsbyUtilities => {
  await createPages(gatsbyUtilities)
  await createPosts(gatsbyUtilities)
  await createPortfolios(gatsbyUtilities)
  await createPeople(gatsbyUtilities)
  await createFaqs(gatsbyUtilities)
}
