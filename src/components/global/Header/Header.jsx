import React, { useState, useEffect } from 'react';
import HeaderLogo from './HeaderLogo';
import NavMenu from '../navs/NavMenu';
import * as styles from './header.module.scss';

const Header = ({ isHome }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [scrolledDown, setScrolledDown] = useState(false);
    const [throttle, setThrottle] = useState(false);

    useEffect(() => {
        const checkWindowScroll = () => {
            if (throttle) {
                return;
            }

            setThrottle(true);

            setTimeout(() => {
                if (window.scrollY > 1) {
                    setScrolledDown(true);
                    setThrottle(false);
                } else {
                    setScrolledDown(false);
                    setThrottle(false);
                }
            }, 100)
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', checkWindowScroll);
        }
    }, [scrolledDown]);

    return (
        <header className={`${styles.header} ${isHome && styles.headerIsHome} ${showMenu ? styles.mobileMenuShow : ''} ${scrolledDown ? styles.scrolledDown : ''}`}>
            <div className={`${styles.headerContainer} container ${showMenu ? 'mobile-menu-shown' : ''}`}>
                <HeaderLogo />
                <NavMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
        </header>
    )
}

export default Header;