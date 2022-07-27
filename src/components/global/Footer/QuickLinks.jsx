import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import * as styles from './quicklinks.module.scss';

const QuickLinks = () => {
    const data = useStaticQuery(graphql`
    query {
        wp {
            themeOptions {
                themeOptions {
                    footerQuickLinksHeading
                }
            }
        }
        wpMenu(name: {eq: "Quick Links"}) {
            menuItems {
              nodes {
                url
                label
              }
            }
          }
    }`);

    const { footerQuickLinksHeading } = data.wp.themeOptions.themeOptions;
    const { nodes } = data.wpMenu.menuItems;

    const renderLinks = (links) => {
        return links.map(link => (
            <li key={link?.label}>
                <Link to={link?.url} title={link?.label}>{link?.label}</Link>
            </li>
        ))
    }

    return (
        <div className="site-footer-col">
            <div className="site-footer-section">
                {footerQuickLinksHeading && <h4 className='h3 site-footer-heading'>{footerQuickLinksHeading}</h4>}
                {nodes && <ul className={styles.siteFooterQuickLinks}>
                    {renderLinks(nodes)}
                    </ul>}
            </div>
        </div>
    )
}

export default QuickLinks;