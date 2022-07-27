import React from 'react';
import { Link } from 'gatsby';
import SingleFaq from './SingleFaq.jsx';
import * as styles from './faqblock.module.scss';

const FaqBlock = ({ category }) => {
    const { name, uri, faqs, count } = category;

    const renderFAQs = () => {
        if (count > 3) {
            const limitedFAQs = faqs.nodes.filter((item, index) => index < 3);
            return limitedFAQs.map(item => {
                return (
                    <SingleFaq item={item} key={item.title} />
                )
            })
        } else {
            return faqs.nodes.map(item => {
                return (
                    <SingleFaq item={item} key={item.title} />
                )
            })
        }
    }

    return (
        <div className={styles.faqsPageCategory} data-aos="fade-up">
            <h2 className={styles.faqsPageCategoryTitle}>
                {name}
            </h2>
            <div className="triangles-shortcode"></div>
            {renderFAQs()}
            <Link to={uri} className={styles.faqsPageAllLink} title={name}>View All {name} FAQs</Link>
        </div>
    )
}

export default FaqBlock;