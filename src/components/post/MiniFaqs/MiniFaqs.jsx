import React from 'react';
import Faq from './Faq';
import * as styles from './minifaqs.module.scss';

const MiniFaqs = ({ animation, bottomPadding, faqs, faqsTitle, heading, subheading, topPadding }) => {
    const renderFaqs = () => {
        return faqs.map((faq, index) => <Faq faq={faq} index={index} key={faq.title} />);
    }

    return (
        <section className={styles.miniFaqs} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className={`container ${styles.miniFaqsContainer}`}>
                <div className="row">
                    <div className={`col-md-6 ${styles.miniFaqsHeadingCol}`}>
                        {heading && <h3 className={styles.miniFaqsHeading} dangerouslySetInnerHTML={{ __html: heading }}></h3>}
                        {subheading && <h4 className={styles.miniFaqsSubheading} dangerouslySetInnerHTML={{ __html: subheading }}></h4>}
                    </div>
                    <div className="col-md-6">
                        {faqsTitle && <h3 className={styles.miniFaqsFaqsTitle} dangerouslySetInnerHTML={{ __html: faqsTitle}}></h3>}
                        {faqs.length > 0 && renderFaqs()}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default MiniFaqs;