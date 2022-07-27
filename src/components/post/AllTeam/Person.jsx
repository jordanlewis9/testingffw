import React from 'react';
import { Link } from 'gatsby';
import * as styles from './person.module.scss';

const Person = ({ person, index }) => {
    const image = person?.team?.headshot?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    // splitting the name string by the space, then mapping over that array and placing span tags around every array item
    const renderNameSpanTags = () => {
        const nameArray = person.title.split(' ');
        return nameArray.map(name => <span>{name}</span>);
    }

    return (
        <div className={`col-md-4 col-lg-3 ${styles.teamBlockCol}`} data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
            <Link to={person.uri} className={styles.teamBlockMember} title={person.title}>
                <div className={`${styles.teamBlockImage} bg-cover`} style={{ backgroundImage: image && `url('${image}')` }}></div>
                <div className={styles.teamBlockName}>
                    {renderNameSpanTags()}
                    <span className={styles.teamBlockPosition}>{person?.team?.position}</span>
                </div>
            </Link>
        </div>
    )
}

export default Person;