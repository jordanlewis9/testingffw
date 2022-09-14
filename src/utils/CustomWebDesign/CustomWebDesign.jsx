import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import GravityForm from '../../gravityForms/GravityForm';
import * as styles from './customwebdesign.module.scss';

const CustomWebDesign = (props) => {
    const data = useStaticQuery(graphql`query{
        wpGfForm(databaseId: { eq: 51}) {
            databaseId,
            ...GravityFormFields
        }
    }`);

    return (
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            <GravityForm form={data.wpGfForm} />
        </div>
    )
}

export default CustomWebDesign;