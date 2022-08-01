// See .cache/page-templates after running dev/build
// to understand how this file ends up looking

import React, { useEffect } from 'react'
import { graphql } from 'gatsby';
import 'aos/dist/aos.css';
import GlobalContainer from '../components/global/GlobalContainer';
import BlogPageHeader from '../components/global/BlogPageHeader';
import BlogAuthorBox from '../components/global/BlogAuthorBox';
// import './pageTemplate.module.scss';

// ### COMPONENT IMPORTS ### DO NOT MODIFY OR MOVE THIS COMMENT ###

const PageTemplate = pageProps => {
  let AOS;
  useEffect(() => {
    /**
     * Server-side rendering does not provide the 'document' object
     * therefore this import is required either in useEffect or componentDidMount as they
     * are exclusively executed on a client
     */
    const AOS = require("aos");
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (AOS) {
      AOS.refresh();
    }
  });


  const { categories, date, postAuthor, title } = pageProps.data.wpPost;

  let components
  // ### COMPONENTS VARIABLE ### DO NOT MODIFY OR MOVE THIS COMMENT ###
  components = components.map(component => {
    return {
      name: component.__typename.split('_').pop(),
      data: component,
    }
  })
  return (
    <GlobalContainer pageProps={pageProps}>
      <BlogPageHeader />
      <div className="single-wrap">
          <div className="container container-medium single-container">
            <article>
              <header className='single-post-header'>
                  <h1 className='single-post-title'>
                      {title}
                  </h1>
                  <div className='single-post-meta'>
                      {date}
                  </div>
              </header>
              {components.map((component, index) => {
                // ### COMPONENT RENDERING ### DO NOT MODIFY OR MOVE THIS COMMENT ###
                return <div>Error: The component {component.name} was not found</div>
              })}
              <BlogAuthorBox categories={categories} postAuthor={postAuthor} />
            </article>
          </div>
      </div>
    </GlobalContainer>
  )
}

export default PageTemplate

// ### PAGE QUERY ### DO NOT MODIFY OR MOVE THIS COMMENT ###
