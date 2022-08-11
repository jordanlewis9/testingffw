import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import * as styles from './contactus.module.scss';

const ContactUs = () => {
    const data = useStaticQuery(graphql`
    query {
        wp {
            themeOptions {
                themeOptions {
                    footerContactHeading
                    footerAddress {
                        target
                        title
                        url
                    }
                    footerEmailAddress {
                        target
                        title
                        url
                    }
                    footerPhoneNumber {
                        target
                        title
                        url
                    }
                }
            }
        }
    }`);

    const { footerContactHeading, footerAddress, footerEmailAddress, footerPhoneNumber } = data.wp.themeOptions.themeOptions;

    return (
        <div className='site-footer-col'>
            <div className="site-footer-section">
                {footerContactHeading && <h4 className='h3 site-footer-heading'>{footerContactHeading}</h4>}
                {footerAddress && <a className={styles.siteFooterContactAddress} href={footerAddress?.url} title={footerAddress?.title} target={footerAddress?.target}><span dangerouslySetInnerHTML={{ __html: footerAddress?.title }}></span></a>}
                {footerEmailAddress && <a className={styles.siteFooterContactEmail} href={footerEmailAddress?.url} target={footerEmailAddress?.target} title={footerEmailAddress?.title}><span>{footerEmailAddress?.title}</span></a>}
                {footerPhoneNumber && <a className={styles.siteFooterContactPhone} href={footerPhoneNumber?.url} target={footerPhoneNumber?.target} title={footerPhoneNumber?.title}><span>{footerPhoneNumber?.title}</span></a>}
            </div>
        </div>
    )
}

export default ContactUs;