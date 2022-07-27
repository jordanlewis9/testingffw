import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './headerlogo.module.scss';

const HeaderLogo = () => {
    const data = useStaticQuery(graphql`
    query {
        wp {
            themeOptions {
                themeOptions {
                    logo {
                        sourceUrl
                        altText
                    }
                }
            }
        }
    }`)

    const { logo } = data.wp.themeOptions.themeOptions;

    return (
        <Link className={styles.siteHeaderBrand} to='/' title="Homepage" target="_self">
            <img src={logo.sourceUrl} alt={logo.altText} className={"styles.siteHeaderLogo"} />
        </Link>
    )
}

export default HeaderLogo;