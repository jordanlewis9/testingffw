import React from 'react';
import NewFaqSuggestion from '../../../utils/NewFaqSuggestion/NewFaqSuggestion';
import * as styles from './faq.module.scss';

const Faq = ({ faq, index }) => {
    const { content, title, addForm } = faq;

    const handleClick = (e) => {
        e.preventDefault();

        if (typeof document !== "undefined") {
            const openFaq = document.querySelector('.mini-faqs-faq-open');
            const thisFaq = e.target.closest('.mini-faqs-faq');
            const faqContent = thisFaq.querySelector('.mini-faqs-faq-content');
    
            if (openFaq && openFaq !== thisFaq) {
                const oldContent = openFaq.querySelector('.mini-faqs-faq-content');
                oldContent.classList.remove('mini-faqs-faq-content-open');
                openFaq.classList.remove('mini-faqs-faq-open');
                faqContent.classList.add('mini-faqs-faq-content-open');
                thisFaq.classList.add('mini-faqs-faq-open');
            } else if (openFaq === thisFaq) {
                faqContent.classList.remove('mini-faqs-faq-content-open');
                thisFaq.classList.remove('mini-faqs-faq-open');
            } else {
                faqContent.classList.add('mini-faqs-faq-content-open');
                thisFaq.classList.add('mini-faqs-faq-open');
            }
        }
    }

    return (
        <div className={`mini-faqs-faq ${styles.miniFaqsFaq}`} data-aos="fade-right" data-aos-delay={(index + 1) * 100}>
            <h4 className={`mini-faqs-faq-title ${styles.miniFaqsFaqTitle}`} onClick={(e) => handleClick(e)} dangerouslySetInnerHTML={{ __html: title }}></h4>
            <div className={`mini-faqs-faq-content ${styles.miniFaqsFaqContent}`}>
                <span dangerouslySetInnerHTML={{ __html: content }}></span>
                {addForm === "newFaq" && <NewFaqSuggestion />}
            </div>
        </div>
    )
}

export default Faq;