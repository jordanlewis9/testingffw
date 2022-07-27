import React from "react";
import { graphql } from "gatsby";

import useGravityForm, { ACTION_TYPES } from "../hooks/useGravityForm";

export const ADDRESS_FIELD_FIELDS = graphql`
  fragment AddressFieldFields on WpAddressField {
    id
    label
    description
    cssClass
    inputs {
      key
      label
      placeholder
    }
  }
`;

const DEFAULT_VALUE = {};

const AUTOCOMPLETE_ATTRIBUTES = {
  street: 'address-line1',
  lineTwo: 'address-line2',
  city: 'address-level2',
  state: 'address-level1',
  country: 'country-name',
};

export default function AddressField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, inputs } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE;

  function handleChange(event) {
    const { name, value } = event.target;
    const newAddressValues = { ...addressValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        id,
        addressValues: newAddressValues,
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <legend>{label}</legend>
      {inputs?.map(input => {
        const key = input?.key;
        const inputLabel = input?.label || '';
        const placeholder = input?.placeholder || '';
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ''}
              onChange={handleChange}
            />
            <label htmlFor={`input_${formId}_${id}_${key}`}>{inputLabel}</label>
          </div>
        );
      }
      )}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </fieldset>
  );
}
