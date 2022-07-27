import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import GravityForm from '../../../gravityForms/GravityForm';
import * as styles from './contactuscontactform.module.scss';

const ContactUsContactForm = ({ paddingTop, paddingBottom }) => {
    const data = useStaticQuery(graphql`query{
        wpGfForm(databaseId: { eq: 3}) {
            databaseId,
            ...GravityFormFields
        }
    }`);

    return (
        <div className="container container-narrow" style={{ paddingTop, paddingBottom }}>
            <GravityForm form={data.wpGfForm} />
        </div>
    )
}

export default ContactUsContactForm;