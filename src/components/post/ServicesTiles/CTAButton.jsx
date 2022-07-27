import React from "react";
import * as styles from './ctabutton.module.scss';

const CTAButton = ({ count, button }) => {
    const { url, title, target } = button;

    const delay = (count + 1) * 50;

    return (
        <div className={`${styles.servicesTilesCol} col-md-${count % 3 === 1 ? "8" : "4"}`} data-aos="fade-up" data-aos-delay={delay}>
            <a href={url} target={target} title={title} className={`${styles.servicesTilesCtaButton} forefrontweb-button`}>
                {title}
            </a>
        </div>
    )
}

export default CTAButton;