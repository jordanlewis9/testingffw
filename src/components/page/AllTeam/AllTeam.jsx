import React from 'react';
import Person from './Person';
import * as styles from './team.module.scss';

const AllTeam = ({ bottomPadding, peopleToDisplay, topPadding, heading }) => {

    const renderPeople = () => {
        return peopleToDisplay.map((person, index) => <Person person={person} key={person.title} index={index} />)
    }
    return (
        <div className={styles.teamBlock} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
            <div className={styles.teamBlockInner}>
                <div className="container">
                    {heading && 
                    <div className={styles.teamBlockHeadingWrap}>
                        <h3 className={styles.teamBlockHeading}>{heading}</h3>
                    </div>
                    }
                    <div className="row">
                        {(peopleToDisplay && peopleToDisplay.length > 0) && renderPeople()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllTeam;