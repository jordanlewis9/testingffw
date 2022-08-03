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
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(formats: WEBP)
                    }
                  }
                }
              }
            }
          }
    }`)

    const { logo } = data.wp.themeOptions.themeOptions;
    const image = logo?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    return (
        <Link className={`${styles.siteHeaderBrand} site-header-mobile-nav`} to='/' title="Homepage" target="_self">
            <img src={image} alt={logo.altText} className={styles.siteHeaderLogo} />
        </Link>
    )
}

export default HeaderLogo;