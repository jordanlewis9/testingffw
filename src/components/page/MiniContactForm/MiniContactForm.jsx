import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GravityForm from '../../../gravityForms/GravityForm';
import * as styles from './minicontactform.module.scss';
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons';

const MiniContactForm = ({ animation, bottomPadding, formTitle, heading, subheading, topPadding}) => {
    const data = useStaticQuery(graphql`query{
        wpGfForm(databaseId: { eq: 1}) {
            databaseId,
            ...GravityFormFields
        }
    }`);

    return (
        <section className={styles.miniContact} style={{ paddingTop: topPadding, paddingBottom: bottomPadding }} data-aos={animation && animation}>
            <div className={`container ${styles.miniContactContainer}`}>
                <div className="row align-items-center">
                    <div className={`col-md-6 ${styles.miniContactHeadingCol}`}>
                        {heading && <h3 className={styles.miniContactHeading}>{heading}</h3>}
                        {subheading && <h4 className={styles.miniContactSubheading}>{subheading}</h4>}
                    </div>
                    <div className="col-md-6">
                        {formTitle && <h3 className={styles.miniContactFormTitle}>{formTitle}</h3>}
                        <GravityForm form={data.wpGfForm} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MiniContactForm;