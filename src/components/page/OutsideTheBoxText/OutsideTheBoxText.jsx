import React from 'react';
import * as styles from './outsidetheboxtext.module.scss';

const OutsideTheBoxText = ({ animation, backgroundColor, bottomPadding, bottomText, content, leftText, textColor, topPadding, topText }) => {

    return (
        <section className={styles.outsideTheBox} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className={styles.outsideTheBoxWrap}>
                <div className={styles.outsideTheBoxBox} style={{ backgroundColor: backgroundColor }}>
                    <div className={`container container-narrow ${styles.outsideTheBoxInner}`} dangerouslySetInnerHTML={{ __html: content}}></div>
                    {bottomText && <div className={styles.outsideTheBoxBottomText} dangerouslySetInnerHTML={{ __html: bottomText}}></div>}
                    {leftText && <div className={styles.outsideTheBoxLeftText} dangerouslySetInnerHTML={{ __html: leftText}}></div>}
                    {topText && <div className={styles.outsideTheBoxTopText} dangerouslySetInnerHTML={{ __html: topText}}></div>}
                </div>
            </div>
        </section>
    )
}

export default OutsideTheBoxText;