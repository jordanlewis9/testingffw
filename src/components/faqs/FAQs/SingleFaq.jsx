import React from 'react';
import * as styles from './singlefaq.module.scss';

const SingleFaq = ({ item }) => {
    const handleFAQClick = (e) => {
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

    return (
        <div className={`${styles.faqsPageFaq} faqs-page-faq`}>
            <h4 className={`${styles.faqsPageFaqTitle} faqs-page-faq-title`} onClick={(e) => handleFAQClick(e)}>{item.title}</h4>
            <div className={`${styles.faqsPageFaqContent} faqs-page-faq-content`} dangerouslySetInnerHTML={{ __html: item.content }}></div>
        </div>
    )
}

export default SingleFaq;