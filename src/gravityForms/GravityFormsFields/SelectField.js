import React from "react";
import { graphql } from "gatsby";

import useGravityForm, { ACTION_TYPES } from "../hooks/useGravityForm";

export const SELECT_FIELD_FIELDS = graphql`
  fragment SelectFieldFields on WpSelectField {
    id
    label
    description
    cssClass
    isRequired
    defaultValue
    choices {
      text
      value
    }
  }
`;

export default function SelectField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, isRequired, defaultValue, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || defaultValue;
  
  // if (!fieldValue?.value && isRequired) {
  //   dispatch({
  //     type: ACTION_TYPES.updateSelectFieldValue,
  //     fieldValue: {
  //       id,
  //       value: defaultValue || "",
  //     },
  //   })
  // }

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}{isRequired && <span className="is-required"> (Required)</span>}</label>
      <select
        name={id}
        id={htmlId}
        required={isRequired}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      >
        {choices?.map(choice =>
          <option key={choice?.value || ''} value={choice?.value || ''}>{choice?.text || ''}</option>
        )}
      </select>
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
  );
}
