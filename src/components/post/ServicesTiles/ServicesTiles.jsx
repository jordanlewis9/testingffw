import React from 'react';
import { Link } from 'gatsby';
import Tile from './Tile';
import CTAButton from './CTAButton';
import * as styles from './servicetiles.module.scss';

const ServicesTiles = ({ bottomPadding, button, heading, preheading, tiles, topPadding, ctaButton }) => {
    const renderTiles = (tiles) => {
        return tiles.map((tile, index) => (
            <Tile tile={tile} key={tile?.link?.title} index={index} />
        ))
    }
    return (
        <section className={styles.servicesTiles} style={{paddingTop: topPadding, paddingBottom: bottomPadding}}>
            <div className={styles.container}>
                <div className={styles.servicesTilesAlignItemsCenter}>
                    <div className={styles.servicesTilesHeadingCol} data-aos="fade-in">
                        <h2 className={styles.servicesTilesHeadingWrap}>
                            <span className={styles.servicesTilesPreheading}>
                                {preheading}
                            </span>
                            <span className={styles.servicesTilesHeading}>
                                {heading}    
                            </span>
                        </h2>
                        <div className="triangles-shortcode"></div>
                        {button && <Link to={button.url} target={button.target} title={button.title} className={`${styles.servicesTilesButton} forefrontweb-button`}>
                            <span>{button.title}</span>
                        </Link>}
                    </div>
                    <div className={styles.servicesTilesTileCol}>
                        <div className={styles.servicesTilesRow}>
                            {tiles && renderTiles(tiles)}
                            {(ctaButton && (tiles.length % 3 === 1 || tiles.length % 3 === 2)) && <CTAButton count={tiles.length} button={ctaButton} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ServicesTiles;