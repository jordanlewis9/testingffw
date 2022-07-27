import React, { useRef, useEffect } from 'react';
import Logo from './Logo';
import * as styles from './scrollinglogos.module.scss';

const ScrollingLogos = ({ scrollSpeed, logos, animation, topPadding, bottomPadding }) => {
    const el = useRef();
    let $, marquee;

    useEffect(() => {
        const $ = require('jquery');
        const marquee =  require('jquery.marquee');
        const $el = $(el.current);

        $el.marquee({
            duration: scrollSpeed * 1000,
            gap: 0,
            duplicated: true,
            startVisible: true,
            pauseOnHover: true
        })
    }, [])

    const renderLogos = () => {
        if (logos.length > 0) {
            let i = 0;
            let renderedArray = [];
            for ( let j = 0; j < 4; j++) {
                logos.forEach(logo => {
                    i++;
                    renderedArray.push(<Logo logo={logo.logo} link={logo?.link} key={`${logo?.link?.title}${i}`}/>)
                });
            }
            return renderedArray;
        }
    }

    return (
        <section className={styles.scrollingLogos} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className="container">
                <div className={styles.scrollingLogosMarquee} ref={el}>
                    <div className={styles.scrollingLogosLogos}>
                        {renderLogos()}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ScrollingLogos;