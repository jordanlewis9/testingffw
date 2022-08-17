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
                      gatsbyImageData(formats: WEBP, width: 180, height: 52, placeholder: NONE)
                    }
                  }
                }
              }
            }
          }
    }`)

    const { logo } = data.wp.themeOptions.themeOptions;
    const image = getImage(logo.localFile);

    return (
        <Link className={`${styles.siteHeaderBrand} site-header-mobile-nav`} to='/' title="Homepage" target="_self">
          <GatsbyImage image={image} className={styles.siteHeaderLogo} alt={logo.altText} loading="eager" />
        </Link>
    )
}

export default HeaderLogo;