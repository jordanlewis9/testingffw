import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { PagePropsContext } from '../components/global/GlobalContext';
import GlobalContainer from '../components/global/GlobalContainer';

const NotFoundPage = (pageProps) => {

  useEffect(() => {
    const searchTerm = pageProps?.location?.pathname.split('/');
    navigate(`/site-search?q=${searchTerm[searchTerm.length - 1]}`)
  }, [])

  return (
    <>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  )
}

export default NotFoundPage
