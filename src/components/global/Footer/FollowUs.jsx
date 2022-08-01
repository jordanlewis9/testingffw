import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './followus.module.scss';

const FollowUs = () => {
    const data = useStaticQuery(graphql`
    query {
        wp {
            themeOptions {
                themeOptions {
                    footerGooglePartnerLink
                    footerSocialsHeading
                    socialIcons {
                        icon
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

    const { footerGooglePartnerLink, footerSocialsHeading, socialIcons } = data.wp.themeOptions.themeOptions;

    const renderSocials = (socials) => {
        return socials.map(social => (
            <a key={social?.link?.title} className={styles.siteFooterSocialLink} href={social?.link?.url} target={social?.link?.target} title={social?.link?.title}>
                <span className={styles.siteFooterSocialIcon}><FontAwesomeIcon icon={social.icon}></FontAwesomeIcon></span>
                {social?.link?.title}
            </a>
        ))
    }

    return (
        <div className='site-footer-col'>
            <div className="site-footer-section">
                {footerSocialsHeading && <h4 className='h3 site-footer-heading'>{footerSocialsHeading}</h4>}
                {socialIcons && <div className={styles.siteFooterSocials}>
                    {renderSocials(socialIcons)}
                    </div>}
                    {footerGooglePartnerLink && <a className={styles.siteFooterGooglePartner} href={footerGooglePartnerLink} target="_blank">
                        <StaticImage src='../../../../static/img/PartnerBadgeClickable.svg' alt="Google Partner" width={250} height={250} />
                        </a>}
            </div>
        </div>
    )
}

export default FollowUs;