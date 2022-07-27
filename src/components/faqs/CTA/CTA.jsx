import React from 'react';
import { Link } from 'gatsby';
import * as styles from './cta.module.scss';

const CTA = ({ content, link }) => {

    return (
        <div className={styles.faqsPageCta} data-aos="fade-up" data-aos-delay="100">
            <div className={styles.faqsPageCtaContent} dangerouslySetInnerHTML={{ __html: content }}></div>
            {link && <Link to={link.url} className={`${styles.faqsPageCtaButton} forefrontweb-button`} target={link.target} title={link.title}>
                <span>{link.title}</span>
            </Link>}
        </div>
    )
}

export default CTA;