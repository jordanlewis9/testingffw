import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import * as styles from './support.module.scss';

const Support = () => {
    const data = useStaticQuery(graphql`
    query {
        wp {
            themeOptions {
                themeOptions {
                    footerSupportHeading
                    footerSupportLinks {
                    buttonStyle
                        link {
                            target
                            title
                            url
                        }
                    }
                }
            }
        }
    }`);

    const { footerSupportHeading, footerSupportLinks } = data.wp.themeOptions.themeOptions;

    const renderLinks = (links) => {
        return links.map(link => (
            <div className={styles.siteFooterSupportWrap} key={link?.link?.title}>
                {link?.link?.url.includes('http') ? <a href={link?.link?.url} target={link?.link?.target} title={link?.link?.title} className={`${styles.siteFooterSupportButton} forefrontweb-button forefrontweb-button--${link?.buttonStyle}`}><span>{link?.link?.title}</span></a> 
                : <Link to={link?.link?.url} target={link?.link?.target} title={link?.link?.title} className={`${styles.siteFooterSupportButton} forefrontweb-button forefrontweb-button--${link?.buttonStyle}`}><span>{link?.link?.title}</span></Link>}
            </div>
        ))
    }

    return (
        <div className='site-footer-col'>
            <div className='site-footer-section'>
                {footerSupportHeading && <h4 className='h3 site-footer-heading'>{footerSupportHeading}</h4>}
                {footerSupportLinks && renderLinks(footerSupportLinks)}
            </div>
        </div>
    )
}

export default Support;