import React from 'react';
import * as styles from './fullwidthtext.module.scss';

const FullWidthText = ({ contentWidth, content, backgroundColor, animation, topPadding, bottomPadding }) => {

    return (
        <section className={styles.fullText} style={{ paddingTop: topPadding, paddingBottom: bottomPadding, backgroundColor: backgroundColor ? backgroundColor : ''}}>
            <div className={`container container-${contentWidth}`} dangerouslySetInnerHTML={{ __html: content }} data-aos={animation && animation}></div>
        </section>
    )
}

export default FullWidthText;