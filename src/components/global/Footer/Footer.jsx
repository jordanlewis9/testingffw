import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ContactUs from './ContactUs';
import QuickLinks from './QuickLinks';
import Support from './Support';
import FollowUs from './FollowUs';
import Copyright from './Copyright';
import * as styles from './footer.module.scss';

const Footer = () => {
    const data = useStaticQuery(graphql`query{
        wp {
            themeOptions {
                themeOptions {
                    footerCopyrightText
                  }
                }
            }
    }`);

    return (
        <footer className={styles.siteFooter}>
            <div className={styles.siteFooterTop}>
                <div className='container'>
                    <div className="row">
                        <ContactUs />
                        <QuickLinks />
                        <Support />
                        <FollowUs />
                    </div> 
                </div>
            </div>
            <Copyright />
        </footer>
    )
}

export default Footer;