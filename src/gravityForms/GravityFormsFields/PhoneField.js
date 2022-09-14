import React from "react";
import { graphql } from "gatsby";

import useGravityForm, { ACTION_TYPES } from "../hooks/useGravityForm";

export const PHONE_FIELD_FIELDS = graphql`
  fragment PhoneFieldFields on WpPhoneField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

const DEFAULT_VALUE = '';

export default function PhoneField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, isRequired, placeholder } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}{isRequired && <span>*</span>}</label>
      <input
        type="tel"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updatePhoneFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
  );
}
