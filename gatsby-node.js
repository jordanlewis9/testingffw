/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 * Based on: https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/gatsby-node.js
 */

require("dotenv").config({
  path: `env.${process.env.NODE_ENV}`
})
// const { makeOptions, createPosts } = require('./create/createPosts')
const { setOptions, createPages } = require('./create/createPages')
const createPosts = require('./create/createPosts');
const createPortfolios = require('./create/createPortfolios');
const createPeople = require('./create/createPeople');
const createFaqs = require('./create/createFaqTaxArchive');
const createRedirects = require('./create/createRedirects');

setOptions({
  postTypes: ['Page'],
  graphQLFieldGroupName: 'pageBlocks',
  graphQLFieldName: 'content',
})

// makeOptions({
//   postTypes: ['Post'],
//   graphQLFieldGroupName: 'pageBlocks',
//   graphQLFieldName: 'content'
// })

module.exports.createPages = async (gatsbyUtilities) => {
  const { createRedirect } = gatsbyUtilities.actions;

  
  await createPages(gatsbyUtilities)
  await createPosts(gatsbyUtilities)
  await createPortfolios(gatsbyUtilities)
  await createPeople(gatsbyUtilities)
  await createFaqs(gatsbyUtilities)
  const allRedirects = await createRedirects(gatsbyUtilities);

  allRedirects.forEach(redirect => {
    const { fromAddress, toAddress } = redirect.redirectOptions
    createRedirect({
      fromPath: `${fromAddress}`,
      toPath: `${toAddress}`
    })
  })
  
  createRedirect({
    fromPath: '/portfolio/tourism/',
    toPath: '/our-work/government/'
  });
  createRedirect({
    fromPath: '/?page_id=1698',
    toPath: '/services/digital-marketing-agency/'
  });
  createRedirect({
    fromPath: '/portfolio-item/honda-wellness/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/get-started/',
    toPath: '/contact'
  });
  createRedirect({
    fromPath: '/portfolio/startup/',
    toPath: '/our-work/'
  });
  createRedirect({
    fromPath: '/services/social-media-management/',
    toPath: '/services/content-marketing/'
  });
  createRedirect({
    fromPath: '/services/success-plans/',
    toPath: '/services/digital-marketing-agency/'
  });
  createRedirect({
    fromPath: '/portfolio/finance/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/services/content-marketing/',
    toPath: '/services/content-marketing/'
  });
  createRedirect({
    fromPath: '/portfolio/healthcare/',
    toPath: '/our-work/healthcare/'
  });
  createRedirect({
    fromPath: '/portfolio/architecture-engineering/',
    toPath: '/our-wrok/aec'
  });
  createRedirect({
    fromPath: '/portfolio/non-profits/',
    toPath: '/our-work/non-profit/'
  });
  createRedirect({
    fromPath: '/portfolio/',
    toPath: '/our-work/'
  });
  createRedirect({
    fromPath: '/portfolio/greek-life/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/portfolio-item/mds-cpa-review/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/author/sarahforefrontweb-com',
    toPath: '/people/sarah-meier/'
  });
  createRedirect({
    fromPath: '/author/schapman',
    toPath: '/team/shannon-chapman/'
  });
  createRedirect({
    fromPath: '/case-study/dynamix-engineering/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/author/kyleforefrontweb-com',
    toPath: '/team/kyle-wilkerson/'
  });
  createRedirect({
    fromPath: '/author/julieforefrontweb-com',
    toPath: '/team/julie-camp/'
  });
  createRedirect({
    fromPath: '/portfolio-item/childrens-hunger-alliance-2/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/author/ngrayforefrontweb-com',
    toPath: '/team/nathanael-gray/'
  });
  createRedirect({
    fromPath: '/portfolio-item/bruner-land-company/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/portfolio-item/eclipsecorp/',
    toPath: '/portfolio-item/eclipsecreative/'
  });
  createRedirect({
    fromPath: '/author/lukeforefrontweb-com',
    toPath: '/about-us'
  });
  createRedirect({
    fromPath: '/author/garth-bishop',
    toPath: '/team/garth-bishop'
  });
  createRedirect({
    fromPath: '/portfolio-item/biometric-information-management/',
    toPath: '/portfolio-item/bim/'
  });
  createRedirect({
    fromPath: '/author/muckety',
    toPath: '/team/scott-kasun/'
  });
  createRedirect({
    fromPath: '/author/nickforefrontweb-com',
    toPath: '/team/nick-aiello'
  });
  createRedirect({
    fromPath: '/services/success-plan/',
    toPath: '/services/digital-marketing/'
  });
  createRedirect({
    fromPath: '/author/smooreforefrontweb-com',
    toPath: '/team/scotty-moore'
  });
  createRedirect({
    fromPath: '/case-study/worthington-foot-ankle/',
    toPath: '/our-work/healthcare/'
  });
  createRedirect({
    fromPath: '/case-study/dave-thomas-foundation-for-adoption/',
    toPath: '/portfolio-item/dave-thomas-foundation-for-adoption/'
  });
  createRedirect({
    fromPath: '/portfolio-item/bridgeport-k9-equipment/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/author/whitneyforefrontweb-com',
    toPath: '/team/whitney-derr'
  });
  createRedirect({
    fromPath: '/author/pclapham',
    toPath: '/team/phillip-clapham/'
  });
  createRedirect({
    fromPath: '/author/garth-bishop/',
    toPath: '/team/garth-bishop'
  });
  createRedirect({
    fromPath: '/author/sarahforefrontweb-com/',
    toPath: '/team/sarah-brittsan'
  });
  createRedirect({
    fromPath: '/author/whitneyforefrontweb-com/',
    toPath: '/team/whitney-derr'
  });
  createRedirect({
    fromPath: '/author/pclapham/',
    toPath: '/team/phillip/clapham'
  });
  createRedirect({
    fromPath: '/author/muckety/',
    toPath: '/team/scott-kasun'
  });
  createRedirect({
    fromPath: '/author/smooreforefrontweb-com/',
    toPath: '/team/scotty-moore'
  });
  createRedirect({
    fromPath: '/services/web-design/',
    toPath: '/services/web-design-development/'
  });
  createRedirect({
    fromPath: '/author/stephanforefrontweb-com/',
    toPath: '/our-team'
  });
  createRedirect({
    fromPath: '/author/ngrayforefrontweb-com/',
    toPath: '/team/nathanael-gray'
  });
  createRedirect({
    fromPath: '/author/julieforefrontweb-com/',
    toPath: '/team/julie-camp'
  });
  createRedirect({
    fromPath: '/author/schapman/',
    toPath: '/team/shannon-chapman'
  });
  createRedirect({
    fromPath: '/author/nickforefrontweb-com/',
    toPath: '/team/nick-aiello'
  });
  createRedirect({
    fromPath: '/author/kyleforefrontweb-com/',
    toPath: '/team/kyle-wilkerson'
  });
  createRedirect({
    fromPath: '/services/consulting/',
    toPath: '/services/'
  });
  createRedirect({
    fromPath: '/portfolio/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/portfolio-item/dog-dayz/',
    toPath: '/our-work'
  });
  createRedirect({
    fromPath: '/about/',
    toPath: '/about-us'
  });
  createRedirect({
    fromPath: '/services/other-stuff/',
    toPath: '/services'
  });
  createRedirect({
    fromPath: '/services/website-design/',
    toPath: '/services/web-design-development/'
  });
  createRedirect({
    fromPath: '/services/digital-marketing-agency/',
    toPath: '/services/digital-marketing/'
  });
}
