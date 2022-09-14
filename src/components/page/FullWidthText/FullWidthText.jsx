import React from 'react';
import FormsFactory from '../../../utils/FormsFactory';
import * as styles from './fullwidthtext.module.scss';

const FullWidthText = ({ contentWidth, content, backgroundColor, animation, topPadding, bottomPadding, addForm }) => {

    return (
        <section className={styles.fullText} style={{ paddingTop: topPadding, paddingBottom: bottomPadding, backgroundColor: backgroundColor ? backgroundColor : ''}}>
            <div className={`container container-${contentWidth}`} data-aos={animation && animation}>
                <span dangerouslySetInnerHTML={{ __html: content }}></span>
                <FormsFactory form={addForm} />
            </div>
        </section>
    )
}

export default FullWidthText;