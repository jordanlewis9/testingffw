import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GravityForm from '../../../gravityForms/GravityForm';
import * as styles from './careerapplication.module.scss';

const CareerApplication = ({ title }) => {
    const data = useStaticQuery(graphql`query{
        wpGfForm(databaseId: { eq: 49}) {
            databaseId,
            ...GravityFormFields
        }
    }`);

    return (
        <div className={`container container-narrow ${styles.careerApplicationContainer}`}>
            <h2 className={styles.careerApplicationHeader}>
                {title}
            </h2>
            <GravityForm form={data.wpGfForm} />
        </div>
    )
}

export default CareerApplication;