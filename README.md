# Advanced Gatsby Wordpress ACF Starter

This is a bare-bones repository to help you get started building pages in gatsby in a component-like fashion with Wordpress using the Advanced Custom Field (ACF) plugin's Flexible Content field on multiple post types.
<br/>

Heavily inspired by Henrik Wirth's [gatsby-starter-wordpress-advanced](https://github.com/henrikwirth/gatsby-starter-wordpress-advanced/tree/tutorial/part-7)
<br/>

## How it works

1. Generates a file for every post of every post type (you specify) and stores these files in `.cache/page-templates`
2. Each of these page files imports **only** the components that are stored in the Flexible Content field in the Wordpress database
3. You only need to write one graphQL query for every component in a `fragment.js` file, for example:
```
components
└── page
      └── Banner
            ├── Banner.js
            └── fragment.js
            └── index.js
```
And the `create/createPages` file will stitch all those fragments together and store them in `src/fragments/components.js`
## Notes

Required plugins for your wordpress installation:
- Advanced Custom Fields PRO (or the standard version)
- WP Gatsby
- WP GraphQL
- [WPGraphQL for Advanced Custom Fields](https://github.com/wp-graphql/wp-graphql-acf/archive/master.zip)

I've included the `acf-json` folder which contains the field groups used in the example components. You can copy/paste this folder into your Wordpress theme folder and import the field groups to test for yourself.

I've also inserted some personal preference when it comes to the folder structure of components. That is, using the post type name as the parent folder for all the components related to that post type. And using global for everything not related to a post type. For example:
```
components
└── global
|     ├── Header
|     ├── Layout
│     └── Modal
└── page
│     ├── Banner
│     ├── GenericContent
│     └── ImageGallery
└── post
      ├── Banner
      └── Content
```

I've also included an example of how a specific component (e.g. `post/Banner`) can re-use a more generic component (e.g. `page/Banner`). Although I couldn't figure out a way to query the data a component needs inside the component itself (e.g. querying for post `title` and `date` in `post/Banner`), so I've just queried all the data a page might need (e.g. in `templates/post.js`) and lazily passed all that data to every child component (e.g. `post/Banner`).

Make sure you ignore `src/fragments/components.js` in your `.gitignore` file. I can't store this generated file in the `.cache` folder because otherwise Gatsby won't detect changes in it and hot-reloads won't refresh the queried data.

## Common Errors and Fixes
```
Cannot read properties of null (reading 'id')
```
This is might be because the page has a flexible content field with no layouts inside. Something about the cache messes things up. Run `npm run clean` to fix.

## Gravity Forms

This [blog post](https://developers.wpengine.com/blog/gravity-forms-in-headless-wordpress-gatsby) describes from the author about how to use Gravity Forms with headless, along with which fields are/are not supported.

When running a Gravity Forms, you **must** create a new component, and retrieve the form through a static query in gatsby. Using a shortcode will render the fields, but the form submission will fail because it will not point to the correct url. 

When creating a form, select fields must either have a default value, or a blank value selection showing as well as being flagged as required. If there is no blank value and the select field is required, in the case the user accidentally skips the field, the app will break. The browser will assume that the field has a value and skip the required check, which it does not.

Name Field always sends Prefix, First, Middle, Last, and Suffix. You should do a generic text field for names instead.

## ENV Variables

This code requires the use of environment variables, or .env for short. You can read more via Gatsby's [blog post](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/) reagrding specific usage. For specific rules:

1. Any sensitive information should be kept as a .env variable. This includes any back-end CMS links, secret keys, API keys, passwords, etc. 

2. Keep local development variables in .env.development, and production variables in .env.production. 

3. Be sure to add .env* to your .gitignore file! We do not want the variables escaping out in the wild. In the same breath, make sure that you do not accidentally push .env.development or .env.production to github/gitlab/etc.

4. You must install the npm package dotenv, and then require it in whatever necessary file, in order to read .env variables. The .env variables do not have to be imported into a file.

5. .env variable convention for listing is, for example, VARIABLE_NAME=nospacesorquotes, where VARIABLE_NAME is the name of the variable, and nospacesorquotes is the value of the variable.

6. .env variables are unitless, hence the example value given above of nospacesorquotes. Do not add quotes on the left or right to designate a string or URL, and do not add a space at the beginning or end.