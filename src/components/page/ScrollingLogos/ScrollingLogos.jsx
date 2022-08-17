import React, { useRef, useEffect } from 'react';
import Logo from './Logo';
import Marquee from 'react-easy-marquee';
import * as styles from './scrollinglogos.module.scss';

const ScrollingLogos = ({ scrollSpeed, logos, animation, topPadding, bottomPadding }) => {
    const el = useRef();
    // let $, marquee;

    // useEffect(() => {
    //     const $ = require('jquery');
    //     const marquee =  require('jquery.marquee');
    //     const $el = $(el.current);

    //     $el.marquee({
    //         duration: scrollSpeed * 1000,
    //         gap: 0,
    //         duplicated: true,
    //         startVisible: true,
    //         pauseOnHover: true
    //     })
    // }, [])

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
        <section className={styles.scrollingLogos} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
                <div className={styles.scrollingLogosMarquee} ref={el}>
                    {/* <div className={styles.scrollingLogosLogos}>
                        {renderLogos()}
                    </div> */}
                    <Marquee className={styles.scrollingLogosLogos} duration={150000} height="10rem" width="100vw" reverse={true} pauseOnHover={true}>
                        {renderLogos()}
                    </Marquee>
                </div>
        </section>
    )
}

export default ScrollingLogos;