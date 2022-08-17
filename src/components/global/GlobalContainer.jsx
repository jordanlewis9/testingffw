import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faInstagram, faTwitter, faLinkedin, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Header from './Header/Header';
import { PagePropsProvider } from './GlobalContext';
import '../../styles/styles.scss'
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';

library.add(faInstagram, faTwitter, faLinkedin, faFacebookF);

const GlobalContainer = (props) => {
    const [isHome, setIsHome] = useState('');
    console.log(props);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.pathname === '/') {
                setIsHome('is-homepage');
            }
        }
        if (typeof document !== "undefined") {
            const accordions = document.querySelectorAll('.accordion-shortcode__toggle');
            if (accordions.length > 0) {
                accordions.forEach(accordion => {
                    accordion.addEventListener('click', (e) => {
                        const content = e.target.closest('.accordion-shortcode__wrap').querySelector('.accordion-shortcode__content');
                        if (content.classList.contains('accordion-shortcode__content-open')) {
                            content.classList.remove('accordion-shortcode__content-open');
                        } else if (document.querySelector('.accordion-shortcode__content-open')) {
                            document.querySelector('.accordion-shortcode__content-open').classList.remove('accordion-shortcode__content-open');
                            content.classList.add('accordion-shortcode__content-open');
                        } else {
                            content.classList.add('accordion-shortcode__content-open')
                        }

                        if (e.target.classList.contains('accordion-shortcode__toggle--open')) {
                            e.target.classList.remove('accordion-shortcode__toggle--open')
                        } else {
                            e.target.classList.add('accordion-shortcode__toggle--open');
                        }
                    })
                })
            }
        }
    }, []);

    let title = props?.pageProps?.pageContext?.title || props?.props?.pageContext?.title;
    title = `${title} | ForeFront Web`;

    const pageTitle = props?.pageProps?.data?.wpPage?.seo?.title || title;
    const pageDescription = props?.pageProps?.data?.wpPage?.seo?.metaDescription || props?.props?.data[props.queryName]?.seo?.metaDescription;

    return (
        <div className={`page-content ${props?.pageProps?.path === "/" && 'is-homepage'}`}>
            <Helmet htmlAttributes={{ lang: 'en'}}>
                <link rel="icon" type="image/x-icon" href="/img/favicon.png"></link>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription}></meta>
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={pageTitle} />
				<meta property="og:description" content={pageDescription} />
				<meta property="og:url" content="https://www.forefrontweb.com/" />
				<meta property="og:site_name" content="ForeFront Web" />
                <meta name="facebook-domain-verification" content="6o8otdzz8ifg2yva2rgcmk5ctk9zif" />
            </Helmet>
            <PagePropsProvider pageProps={props.pageProps} >
                <Header isHome={props?.pageProps?.path === "/" ? 'is-homepage' : ''} />
                {props.children}
                <Footer />
            </PagePropsProvider>
        </div>
    )
}

export default GlobalContainer;