import React from 'react';
import SingleIcon from './SingleIcon';
import * as styles from './iconlist.module.scss';

const IconList = ({ animation, bottomPadding, heading, list, topPadding }) => {
    const renderHeading = () => {
        if (heading) {
            return (
                <div className={styles.iconListHeadingWrap}>
                    <h3 className={styles.iconListHeading}>
                        {heading}
                    </h3>
                </div>
            )
        }
    }

    const renderList = () => {
        return list.map(item => <SingleIcon key={item.text} item={item} />)
    }

    return (
        <section className={styles.iconList} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className="container container-narrow container-no-padding">
                <div className={styles.iconListBox} data-aos={animation && animation}>
                    {renderHeading()}
                    {list?.length > 0 && <ul className={styles.iconListList}>
                        {renderList()}
                    </ul>}
                </div>
            </div>
        </section>
    )
}

export default IconList;