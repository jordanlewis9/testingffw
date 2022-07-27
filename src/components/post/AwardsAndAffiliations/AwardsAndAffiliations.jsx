import React from 'react';
import { Link } from 'gatsby';
import Logo from './Logo';
import * as styles from './awardsandaffiliations.module.scss';

const AwardsAndAffiliations = ({ animation, bottomPadding, button, content, heading, topPadding, logos }) => {
    const renderLogos = () => {
        return logos.map((logo, index) => <Logo logo={logo} index={index} key={index} />)
    }
    return (
        <section className={styles.awardsAffiliations} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className="container container-no-padding">
                <div className="row">
                    <div className={`col-md-5 ${styles.awardsAffiliationsHeadingCol}`}>
                        <div className={styles.awardsAffiliationsHeadingWrap}>
                            {heading && <h3 className={styles.awardsAffiliationsHeading}>{heading}</h3>}
                        </div>
                        {button && 
                        <div className={styles.awardsAffiliationsButtonWrap}>
                            <Link to={button?.url} className={`forefrontweb-button ${styles.awardsAffiliationsButton}`} title={button?.title} target={button?.target}>
                                <span>{button?.title}</span>
                            </Link>
                        </div>
                        }
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    </div>
                    <div className={`col-md-7 ${styles.awardsAffiliationsLogosCol}`}>
                        {logos.length > 0 && 
                        <div className={styles.awardsAffiliationsLogos}>
                            {renderLogos()}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AwardsAndAffiliations;