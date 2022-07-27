import React from 'react';
import { Link } from 'gatsby';
import * as styles from './faqarchive.module.scss';

const FaqArchive = ({ faqs }) => {
    const handleFaqClick = (e) => {
        const parent = e.target.closest('.faqs-page-faq');
        const content = parent.querySelector('.faqs-page-faq-content');

        if (typeof document !== "undefined") {
            if (content.classList.contains('faqs-page-faq-content-open')) {
                content.classList.remove('faqs-page-faq-content-open');
            } else if (document.querySelector('.faqs-page-faq-content-open')) {
                document.querySelector('.faqs-page-faq-content-open').classList.remove('faqs-page-faq-content-open');
                content.classList.add('faqs-page-faq-content-open');
            } else {
                content.classList.add('faqs-page-faq-content-open');
            }
    
            if (parent.classList.contains('faqs-page-faq-open')) {
                parent.classList.remove('faqs-page-faq-open');
            } else if (document.querySelector('.faqs-page-faq-open')) {
                document.querySelector('.faqs-page-faq-open').classList.remove('faqs-page-faq-open');
                parent.classList.add('faqs-page-faq-open');
            } else {
                parent.classList.add('faqs-page-faq-open');
            }
        }
    }
    const renderFaqs = () => {
        return faqs.map(faq => {
            return (
                <div className={`${styles.faqsPageFaq} faqs-page-faq`} key={faq.title}>
                    <h4 className={`${styles.faqsPageFaqTitle} faqs-page-faq-title`} onClick={(e) => handleFaqClick(e)}>{faq.title}</h4>
                    <div className={`${styles.faqsPageFaqContent} faqs-page-faq-content`} dangerouslySetInnerHTML={{ __html: faq.content }}></div>
                </div>
            )
        })
    }

    return (
        <div className={styles.postsArchive}>
            <div className="container">
                {faqs?.length > 0 && renderFaqs()}
                <Link to='/culture/faqs' className={`forefrontweb-button ${styles.faqsPageButton}`} target="_self">Back To All FAQs</Link>
            </div>
        </div>
    )
}

export default FaqArchive;