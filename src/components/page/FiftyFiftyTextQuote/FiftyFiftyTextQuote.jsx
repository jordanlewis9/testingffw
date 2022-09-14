import React from 'react';
import * as styles from './fiftyfiftytextquote.module.scss';
import FormsFactory from '../../../utils/FormsFactory';

const FiftyFiftyTextQuote = ({ content, quote, animation, topPadding, bottomPadding, addForm }) => {

    return (
        <section className={styles.fiftyQuote} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={`container ${styles.fiftyQuoteContainer}`} data-aos={animation && animation}>
                <div className="row">
                    <div className={styles.fiftyQuoteContent} dangerouslySetInnerHTML={{ __html: content }}></div>
                    <div className={styles.fiftyQuoteQuoteCol}>
                        <div className={`${styles.fiftyQuoteQuote} text-white`}>
                            <div className={styles.fiftyQuoteQuoteInner}>
                                <span dangerouslySetInnerHTML={{ __html: quote }}></span>
                                <FormsFactory form={addForm} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FiftyFiftyTextQuote;