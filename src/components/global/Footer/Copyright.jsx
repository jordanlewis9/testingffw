import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import * as styles from './copyright.module.scss';

const Copyright = () => {
    const data = useStaticQuery(graphql`
    query {
        wp {
            themeOptions {
                themeOptions {
                    footerCopyrightText
                }
            }
        }
    }`);

    const { footerCopyrightText } = data.wp.themeOptions.themeOptions;

    return (
        <div className={styles.siteFooterCopyrightText}>
            Copyright &copy; {new Date().getFullYear()} {footerCopyrightText} | <Link to='/privacy-policy' title='Privacy Policy' target='_self'>Privacy Policy</Link>
        </div>
    )
}

export default Copyright;