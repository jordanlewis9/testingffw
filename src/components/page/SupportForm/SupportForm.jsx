import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import GravityForm from '../../../gravityForms/GravityForm';
import * as styles from './supportform.module.scss';

const SupportForm = ({ paddingTop, paddingBottom }) => {
    const data = useStaticQuery(graphql`query{
        wpGfForm(databaseId: { eq: 4}) {
            databaseId,
            ...GravityFormFields
        }
    }`)

    return (
        <div className="container container-narrow" style={{ paddingTop, paddingBottom }}>
            <GravityForm form={data.wpGfForm} />
        </div>
    )
}

export default SupportForm;