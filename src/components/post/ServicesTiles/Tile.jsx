import React from 'react';
import { Link } from 'gatsby';
import * as styles from './tile.module.scss';

const Tile = ({ tile, index }) => {
    const { link, icon } = tile;

    const delay = (index + 1) * 50;

    return (
        <div className={styles.servicesTilesCol} data-aos="fade-up" data-aos-delay={delay}>
            <Link className={styles.servicesTilesTile} to={link?.url} target={link?.target} title={link?.title}>
                <div className={styles.servicesTilesInner}>
                    <div className={styles.servicesTilesIcon} style={{backgroundImage: `url(${icon.sourceUrl})`}}></div>
                    <div className={styles.servicesTilesTileText}>{link?.title}</div>
                </div>
            </Link>
        </div>
    )
}

export default Tile;