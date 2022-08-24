import React from "react";
import { graphql, navigate } from "gatsby";
import { useMutation, gql } from "@apollo/client";

import useGravityForm from "./hooks/useGravityForm";
import GravityFormsField from "./GravityFormsField";

export const GRAVITY_FORM_FIELDS = graphql`
  fragment GravityFormFields on WpGfForm {
    id
    cssClass
    title
    description
    submitButton {
      text
    }
    confirmations {
      isDefault
      message
    }
    formFields {
      nodes {
        id
        type
        ...AddressFieldFields
        ...CheckboxFieldFields
        ...DateFieldFields
        ...EmailFieldFields
        ...MultiSelectFieldFields
        ...NameFieldFields
        ...PhoneFieldFields
        ...RadioFieldFields
        ...SelectFieldFields
        ...TextFieldFields
        ...TextAreaFieldFields
        ...TimeFieldFields
        ...WebsiteFieldFields
      }
    }
  }
`;

const SUBMIT_FORM = gql`
  mutation submitForm($formId: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: {
      id: $formId
      fieldValues: $fieldValues
    }) {
      entry {
        id
        ... on GfSubmittedEntry {
          databaseId
        }
      }
      errors {
        id
        message
      }
    }
  }
`;


export default function GravityFormsForm({ form }) {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);
  const haveEntryId = Boolean(data?.submitGfForm?.entry?.id);
  const haveFieldErrors = Boolean(data?.submitGfForm?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const defaultConfirmation = form.confirmations?.find(confirmation => confirmation?.isDefault);
  const formFields = form.formFields?.nodes || [];
  const { state } = useGravityForm();

  function handleSubmit(event) {
    event.preventDefault();
    if (loading) return 'Submitting...';

    submitForm({
      variables: {
        formId: `${form.databaseId}`,
        fieldValues: state
      }
    }).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    })
  }

  function getFieldErrors(id){
    if (!haveFieldErrors) return [];
    return data.submitGravityFormsForm.errors.filter((error) => error.id === id);
  }

  if (wasSuccessfullySubmitted) {
    if (form.databaseId.toString() === '49') {
      navigate('/careers/application/thank-you')
    } else {
      navigate('/contact/thank-you');
    }
  }

  return (
    <form method="post" className={form.cssClass} onSubmit={handleSubmit}>
      {formFields.map(field =>
        <GravityFormsField
          key={field?.id}
          field={field}
          fieldErrors={getFieldErrors(Number(field?.id))}
        />
      )}
      {error ? (
        <p className="error-message">{error.message}</p>
      ) : null}
      {form.databaseId.toString() === '49' && 
        <p className="career-application-disclaimer">
          Please send your resumé and cover letter to <a href="mailto:info@forefrontweb.com" className="career-application-email">info@forefrontweb.com</a>.
        </p>
      }
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : form?.submitButton?.text || 'Submit'}
      </button>
    </form>
  );
}
