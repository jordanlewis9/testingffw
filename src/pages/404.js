import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { PagePropsContext } from '../components/global/GlobalContext';
import GlobalContainer from '../components/global/GlobalContainer';
import * as styles from './404.module.scss';

const NotFoundPage = (pageProps) => {

  return (
    <GlobalContainer>
      <section className={`${styles.pageHeader}`}>
            <div className="container">
                <div className="row">
                    <div className={`col-md ${styles.pageHeaderLeftColumn}`}>
                        <div className={styles.pageHeaderInner}>
                            <h1 className={styles.pageHeaderTitle}>
                                404: Not Found
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      <div className={`${styles.notFoundContainer} container`}>
        <div className={`${styles.notFoundContainerInner} row`}>
          <div className={`${styles.notFoundLeftSide} col-md-6`}>
            <div className={styles.notFoundLeftImageContainer}>
              <img className={styles.notFoundLeftImage} src="/img/Full-Pineapple.png" />
            </div>
          </div>
          <div className={`${styles.notFoundRightSide} col-md-6`}>
            <h3 className={styles.notFoundRightHeader}>And THIS is Why We Can't Have Nice Things</h3>
            <p>Ok, so, the page you were looking for is not here. It happens; screws fall out all the time, the world is an imperfect place.</p>
            <p><strong>The way we see it, you have the following options:</strong></p>
            <ul className={styles.notFoundRightList}>
              <li className={styles.notFoundRightListItem}>
                <a href="/" title="Home" target="_self">Head back to the home page</a> and pray that no one finds out about this
              </li>
              <li className={styles.notFoundRightListItem}>
                <a href="/contact" title="Let us know!" target="_self">Report this incident to the proper authorities</a> (ensure that someone gets what they deserve)
              </li>
              <li className={styles.notFoundRightListItem}>
                Learn more about the importance of 301 redirects and <a href="/top-5-ways-to-keep-website-clean" title="Top 5 Ways to Keep Your Website Clean" target="_self">routine website upkeep</a>
              </li>
              <li className={styles.notFoundRightListItem}>
                Buy <a href="https://www.amazon.com/Yolococa-Pieces-Finger-Puppet-Hands/dp/B07YHMH4PR/ref=sr_1_3?keywords=miniature+hand&qid=1659364533&sr=8-3" title="Hands for Your Hands" target="_blank">a bunch of miniature hands</a>
              </li>
            </ul>
            <p>In the meantime, here's a picture of our favorite pineapple.</p>
          </div>
        </div>
      </div>
    </GlobalContainer>
  )
}

export default NotFoundPage
