import React, { useEffect, useRef } from 'react';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Rellax from 'rellax';
import * as styles from './featuredcasestudy.module.scss';

const FeaturedCaseStudy = ({ bottomPadding, backgroundImage, link, logo, topPadding, websiteScreenshot }) => {
    let newLogo;
    const newWebsiteScreenshot = websiteScreenshot?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
    const newBackgroundImage = backgroundImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    const rellaxRef = useRef();

    useEffect(() => {
        new Rellax(rellaxRef.current, {
            speed: 2,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });
    }, []);

    if (logo) {
        newLogo = getImage(logo.localFile);
    }

    return (
        <section className={styles.featuredCaseStudy} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={`container-fluid ${styles.featuredCaseStudyContainer}`}>
                <div className="row">
                    <div className="col-md-6">
                        <div style={{backgroundImage: newBackgroundImage && `url('${newBackgroundImage}')`}} className={`${styles.featuredCaseStudyImage} bg-cover`} data-aos="fade-up" data-aos-delay="100">
                            <div className={styles.featuredCaseStudyImageInner}>
                                {newLogo && <GatsbyImage image={newLogo} alt={logo.altText} className={styles.featuredCaseStudyLogo} />}
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles.featuredCaseStudyRightCol}`}>
                        <div className={styles.featuredCaseStudyLinkWrap} data-aos="fade-in">
                            <Link className={`${styles.featuredCaseStudyLink} h3`} to={link?.url} target={link?.target} title={link?.title}>
                                <span>{link?.title}</span>
                                <div className={styles.featuredCaseStudyLinkArrow}></div>
                            </Link>
                        </div>
                        <div className={styles.featuredCaseStudyComputerWrap} data-aos="fade-up" data-aos-delay="200">
                            <div className={`${styles.featuredCaseStudyComputer} bg-contain rellax`} ref={rellaxRef}>
                                {newWebsiteScreenshot && <div style={{ backgroundImage: `url('${newWebsiteScreenshot}')`}} className={`${styles.featuredCaseStudyComputerScreen} bg-cover`}></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCaseStudy;