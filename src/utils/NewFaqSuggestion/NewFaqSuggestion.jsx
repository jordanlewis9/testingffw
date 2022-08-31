import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import GravityForm from '../../gravityForms/GravityForm';
import * as styles from './newfaqsuggestion.module.scss';

const NewFaqSuggestion = (props) => {
    const data = useStaticQuery(graphql`query{
        wpGfForm(databaseId: { eq: 50}) {
            databaseId,
            ...GravityFormFields
        }
    }`);

    return (
        <div className="container container-narrow" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <GravityForm form={data.wpGfForm} />
        </div>
    )
}

export default NewFaqSuggestion;